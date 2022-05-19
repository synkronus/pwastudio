import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { VersionService } from './services/version.service';
import { LoggerService } from './services/http/logger.service';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';
import { HttpClient } from '@angular/common/http';
import { I18nService } from './modules/i18n/i18n.service';

const logger = new LoggerService('VersionCheck');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  // npm run build --configuration production  && npm run post-build
  title = 'Admin Panel';
  private currentHash = '{{POST_BUILD_ENTERS_HASH_HERE}}';
  private currentVersion = false;
  private subSink = new SubSink();

  constructor(private readonly versionService: VersionService,
    private readonly http: HttpClient, private config: PrimeNGConfig,
    private i18nService: I18nService, private translate: TranslateService) { }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
    this.i18nService.destroy();
  }

  private initVersionCheck(url) {
    setInterval(() => {
      this.checkVersion(url);
    }, environment.timeCheck);
  }

  private checkVersion(url): void { //TODO: add retray policy for dropout.
    // timestamp these requests to invalidate caches
    this.subSink.sink = this.http
      .get(url + '?t=' + new Date().getTime(), { headers: { ignoreLoadingBar: '' } })
      .pipe(take(1)).subscribe(
        (res: any) => {
          const hash = res.hash;
          const hashChanged = this.hasHashChanged(this.currentHash, hash, res.date);
          if (hashChanged) {
            this.versionService.setVersionDate(res.date);
            this.versionService.setupToUpDate(false);
            if (confirm('Nueva version disponible. Desea actualizar?')) {
              window.location.reload();
            }
          }
          // store the new hash so we wouldn't trigger versionChange again only necessary in case you did not force refresh
          this.currentHash = hash;
        }
      );
  }

  private hasHashChanged(currentHash, newHash, date) {
    if (!currentHash || currentHash === '{{POST_BUILD_ENTERS_HASH_HERE}}') {
      return false;
    }
    if (!this.currentVersion) {
      this.currentVersion = true;
      this.versionService.setVersionDate(date);
    }
    return currentHash !== newHash;
  }

  ngOnInit() {
    this.versionService.initStore('?$%&xYz123abc$%');
    if (environment.production && environment.versionCheck) {
      this.initVersionCheck(`/version.json`);
    }
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);
    this.translate.get('primeng').subscribe(res => this.config.setTranslation(res));
  }

}

import { SubSink } from 'subsink';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { I18nService } from './i18n.service';
import { PrimeNGConfig } from 'primeng/api';
import UnSubscribe from 'src/app/common/shared/utils/unsubscribe';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.scss']
})
export class LangSelectorComponent extends UnSubscribe implements OnInit {

  subSink = new SubSink();
  language: string;
  options = [];

  constructor(private config: PrimeNGConfig,
                private i18nService: I18nService,
                    private translate: TranslateService) {
    super();
    this.getOptions();
  }

  ngOnInit() {
    this.language = this.i18nService.language;
  }

  setLanguage() {
    this.i18nService.language = this.language;
    this.translate.get('primeng').subscribe(res => this.config.setTranslation(res));
    this.getOptions();
  }

  getOptions() {
    this.options = [];
    const keyLangs: string[] = [];
    const supportedLanguages = this.i18nService.supportedLanguages;
    supportedLanguages.forEach(lang => {
      keyLangs.push(`language.${lang}`);
    });

    const langs: string[] = [];
    this.subSink.sink = this.translate.get(keyLangs).subscribe(values => {
      for (let i = 0; i < supportedLanguages.length; i++) {
        this.options.push({ label: values[keyLangs[i]], value: supportedLanguages[i] });
      }
    });
  }

}

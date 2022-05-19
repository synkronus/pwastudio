import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { ObservableStore } from '@codewithdan/observable-store';
import { AppInjector } from './app/shared/services/app-injector.service';

if (environment.production) {
  enableProdMode();
}

ObservableStore.globalSettings = {
  // isProduction: environment.production,
  trackStateHistory: !environment.production, //
  logStateChanges: !environment.production,
};

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(moduleRef => {
    AppInjector.setInjector(moduleRef.injector);
  })
  .catch(err => console.error(err));

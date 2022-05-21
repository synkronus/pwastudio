import { environment } from 'src/environments/environment';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MessageService } from 'primeng/api';

import { LoggerService } from './logger.service';
import { VersionService } from './version.service';
const logger = new LoggerService('ErrorHandlerGlobal');

@Injectable({
    providedIn: 'root'
  })
export class ErrorsHandler implements ErrorHandler {

  private readonly notifier = this.injector.get(MessageService);
    private readonly version = this.injector.get(VersionService);

    constructor(private injector: Injector) {
        if (environment.production)
            this.settingUpSentryInit((this.version.getCurrentVersion()).toString());
    }

      settingUpSentryInit(vrsn:string) {
        console.info('settingUpSentryInit version ****',vrsn );
      }

    handleError(error: Error | HttpErrorResponse) {
        if(!error.message.includes('/version.json') && environment.production)

        if (!navigator.onLine) {
            // Handle offline error
            this.notifier.add({
                severity: "warn",
                summary: "Service Message",
                detail: 'Browser Offline!',
                life: 5000,
              });
        } else {
          this.notifier.add({
            severity: "info",
            summary: "Hay una nueva version del aplicativo",
            detail: 'Http Error: ' + error.message,
            life: 5000,
          });
          logger.error(error);
        }
    }
}

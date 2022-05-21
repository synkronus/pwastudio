import { NgModule } from '@angular/core';
import { AuthModule } from './auth/auth.module';
import { I18nModule } from './i18n/i18n.module';
import { OverlayAppModule } from './overlay/overlay.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '../services/http/auth-httpInterceptor.service';
import { SharedAppModule } from '../shared/shared-app.module';
import { MessageService } from 'primeng/api';
import { DateFnsService } from '../services/date-fns.service';
import { GlobalHttpService } from './services/generics/global-http.service';
import { MessagingService } from './services/message.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    TranslateModule,
    AuthModule,
    OverlayAppModule,
    SharedAppModule,
  ],
  providers: [
    DateFnsService,
    MessageService,
    MessagingService,
    GlobalHttpService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },

  ],
  exports:[
    CommonModule,
    I18nModule,
    TranslateModule,
    AuthModule,
    OverlayAppModule,
    SharedAppModule,
  ]
})
export class CustomAppModule { }

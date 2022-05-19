import { NgModule } from '@angular/core';
import { AuthModule } from './auth/auth.module';
import { I18nModule } from './i18n/i18n.module';
import { OverlayAppModule } from './overlay/overlay.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '../services/http/auth-httpInterceptor.service';
import { SharedAppModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    AuthModule,
    OverlayAppModule,
    SharedAppModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },

  ],
  exports:[]
})
export class CustomAppModule { }

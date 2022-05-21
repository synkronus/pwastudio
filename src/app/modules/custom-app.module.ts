import { NgModule } from '@angular/core';
import { AuthModule } from './auth/auth.module';
import { I18nModule } from './i18n/i18n.module';
import { OverlayAppModule } from './overlay/overlay.module';
import { CommonModule } from '@angular/common';
import { SharedAppModule } from '../common/shared/shared-app.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    SharedAppModule,
    I18nModule,
    TranslateModule,
    AuthModule,
    OverlayAppModule,
  ],
  exports:[
    I18nModule,
    TranslateModule,
    AuthModule,
    OverlayAppModule,
  ]
})
export class CustomAppModule { }

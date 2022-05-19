import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuAppModule } from '../core/shell/menu.module';
import { CommonAppModule } from '../common/common.module';
import { MessagingService } from '../shared/services/message.service';
import { PRIMENG_MODULE, PRIMENG_PROVIDERS } from '../shared/utils/primeng.modules';
import { GlobalHttpService } from '../shared/services/generics/global-http.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormlyPrimeNGCustomModule } from '../shared/formly-types/ui-primeng.module';

@NgModule({
  imports: [
    CommonModule,
    CommonAppModule,
    PAGES_ROUTES,
    MenuAppModule,
    FormsModule,
    ReactiveFormsModule,
    PRIMENG_MODULE,
    TranslateModule,
    FormlyPrimeNGCustomModule
],
declarations: [
    PagesComponent,
],
exports: [
    PagesComponent,
    FormsModule,
],
providers :[MessagingService, PRIMENG_PROVIDERS, GlobalHttpService],
schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class PagesModule { }

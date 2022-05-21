import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routes';
import { CommonAppModule } from '../common/common.module';

@NgModule({
  imports: [
    PAGES_ROUTES,
    CommonAppModule,

],
declarations: [
    PagesComponent,
],
schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class CoreAppModule { }

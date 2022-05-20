import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routes';
import { ShellAppModule } from '../common/shell/shell.module';
import { CommonAppModule } from '../common/common.module';
import { SharedAppModule } from '../shared/shared-app.module';

@NgModule({
  imports: [
    CommonModule,
    CommonAppModule,
    PAGES_ROUTES,
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

import { I18nModule } from './../../i18n/i18n.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMenuComponent,AppSubMenuComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RightMenuComponent } from './right-menu/right-menu.component';
import { SubMenuComponent } from './sidebar/sub/sub-menu.component';
import { BreadCrumbComponent } from './breadcrumb/breadcrumb.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { PRIMENG_MODULE } from '../../shared/utils/primeng.modules';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports:[
    CommonModule,
    I18nModule,
    TranslateModule,
    PRIMENG_MODULE
],
declarations:[
    AppMenuComponent,
    HeaderComponent,
    BreadCrumbComponent,
    FooterComponent,
    RightMenuComponent,
    SubMenuComponent,
    AppSubMenuComponent,

],
exports: [
    AppMenuComponent,
    HeaderComponent,
    FooterComponent,
    BreadCrumbComponent,
    RightMenuComponent,
    SubMenuComponent,
    AppSubMenuComponent,
],
providers: [AuthService, MenuService],
schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class MenuAppModule { }

import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppMenuComponent,AppSubMenuComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RightMenuComponent } from './right-menu/right-menu.component';
import { SubMenuComponent } from './sidebar/sub/sub-menu.component';
import { BreadCrumbComponent } from './breadcrumb/breadcrumb.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { I18nModule } from 'src/app/modules/i18n/i18n.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    I18nModule,
    TranslateModule,
    RouterModule
  ],
  declarations:[
      AppMenuComponent,
      SubMenuComponent,
      AppSubMenuComponent,
      HeaderComponent,
      BreadCrumbComponent,
      FooterComponent,
      RightMenuComponent,

  ],
  exports: [
    AppMenuComponent,
    SubMenuComponent,
    AppSubMenuComponent,
    HeaderComponent,
    FooterComponent,
    BreadCrumbComponent,
    RightMenuComponent,
  ],
  providers: [AuthService, MenuService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class ShellAppModule { }

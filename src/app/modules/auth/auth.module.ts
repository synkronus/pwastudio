import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { I18nModule } from '../i18n/i18n.module';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from './services/auth-httpInterceptor.service';
import { AuthServiceGuard } from './services/auth-service.guard';
import {DividerModule} from 'primeng/divider';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([ { path: 'login', component: LoginComponent,  data: { title: marker('Login') } } ]),
    ButtonModule,
    InputTextModule,
    PasswordModule,
    I18nModule,
    TranslateModule,
    DividerModule
  ],
  declarations: [
    LoginComponent
  ],
  providers:[
    AuthServiceGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },
  ],
  exports : [LoginComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]

})
export class AuthModule { }

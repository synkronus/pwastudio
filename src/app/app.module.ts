import { NgModule, ErrorHandler, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutesModule } from './app.routes';
import { AppComponent } from './app.component';
import { PagesModule } from './core/pages.module';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LocalStorageService } from './services/local-storage.service';
import { AuthHttpInterceptor } from './services/http/auth-httpInterceptor.service';
import { ErrorsHandler } from './services/http/error-handler.service';
import { MessageService } from 'primeng/api';
import { LoggerService } from './services/http/logger.service';
import { EncodeHttpService } from './services/http/encode-Http.service';

import { HttpDropService } from './services/http/http-drop.service';
import { AuthModule } from './auth/auth.module';
import { CommonAppModule } from './common/common.module';
import { AuthService } from './services/auth/auth.service';
import { DateFnsService } from './services/date-fns.service';
import { TranslateModule } from '@ngx-translate/core';

import { environment } from 'src/environments/environment';
import { ErrorHandlerInterceptor } from './services/http/errorHandlerInterceptor.service';

export const protectedResourceMap: any =
  [
    [environment.base_url, environment.scopeUri]
  ];

@NgModule({
  imports: [
    BrowserModule,
    AppRoutesModule,
    AuthModule,
    PagesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LoadingBarHttpClientModule,
    LoadingBarModule,
    CommonAppModule,
    TranslateModule.forRoot({defaultLanguage: 'es-LA'}),
  ],
  declarations: [
    AppComponent,
  ],
  exports: [CommonAppModule],
  providers: [
    DateFnsService,
    HttpDropService,
    LocalStorageService,
    LoggerService,
    MessageService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EncodeHttpService,
      multi: true
    },
       {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: ErrorHandler, useClass: ErrorsHandler },
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

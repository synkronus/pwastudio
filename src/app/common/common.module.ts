import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HrefPreventDefaultDirective } from './directives/href-prevent-default.directive';
import { HasClaimDirective } from './directives/has-claim.directive';
import { AuthPage } from './directives/auth-page.directive';
import { OverlayLoaderComponent } from './overlay-loader.component';
import { OverlayLoaderInterceptor } from '../services/http/overlay-interceptor.service';
import { PRIMENG_MODULE } from '../shared/utils/primeng.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PRIMENG_MODULE,
  ],
  declarations: [
    HrefPreventDefaultDirective,
    HasClaimDirective,
    AuthPage,
    OverlayLoaderComponent,
  ],
  exports: [
    HrefPreventDefaultDirective,
    HasClaimDirective,
    AuthPage,
    OverlayLoaderComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OverlayLoaderInterceptor,
      multi: true
    }]
})
export class CommonAppModule { }

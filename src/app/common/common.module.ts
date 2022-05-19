import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HrefPreventDefaultDirective } from './directives/href-prevent-default.directive';
import { HasClaimDirective } from './directives/has-claim.directive';
import { AuthPage } from './directives/auth-page.directive';
import { OverlayLoaderInterceptor } from '../services/http/overlay-interceptor.service';
import { ShellAppModule } from './shell/shell.module';
import { SharedAppModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedAppModule,
    ShellAppModule,
  ],
  declarations: [
    HrefPreventDefaultDirective,
    HasClaimDirective,
    AuthPage
  ],
  exports: [
    HrefPreventDefaultDirective,
    HasClaimDirective,
    AuthPage
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OverlayLoaderInterceptor,
      multi: true
    }]
})
export class CommonAppModule { }

import { NgModule } from '@angular/core';
import { AuthPage } from './directives/auth-page.directive';
import { HasClaimDirective } from './directives/has-claim.directive';
import { PRIMENG_MODULE, PRIMENG_PROVIDERS } from './primeng.modules';
import { HrefPreventDefaultDirective } from './directives/href-prevent-default.directive';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  imports:[
    PRIMENG_MODULE
  ],
  declarations: [
    HrefPreventDefaultDirective,
    HasClaimDirective,
    AuthPage,
    TruncatePipe
  ],
  exports: [
    HrefPreventDefaultDirective,
    HasClaimDirective,
    AuthPage,
    PRIMENG_MODULE,
    TruncatePipe
  ],
  providers:[PRIMENG_PROVIDERS]
})
export class SharedAppModule { }

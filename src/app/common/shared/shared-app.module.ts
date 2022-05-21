import { NgModule } from '@angular/core';
import { AuthPage } from './directives/auth-page.directive';
import { HasClaimDirective } from './directives/has-claim.directive';
import { PRIMENG_MODULE, PRIMENG_PROVIDERS } from './primeng.modules';
import { HrefPreventDefaultDirective } from './directives/href-prevent-default.directive';
import { TruncatePipe } from './pipes/truncate.pipe';
import { CurrencyInputDirective } from './directives/currency-input.directive';
import { DatesPipe } from './pipes/dates.pipe';

@NgModule({
  imports:[
    PRIMENG_MODULE
  ],
  declarations: [
    HrefPreventDefaultDirective,
    HasClaimDirective,
    AuthPage,
    TruncatePipe,
    DatesPipe,
    CurrencyInputDirective
  ],
  exports: [
    HrefPreventDefaultDirective,
    HasClaimDirective,
    AuthPage,
    PRIMENG_MODULE,
    TruncatePipe,
    DatesPipe,
    CurrencyInputDirective
  ],
  providers:[PRIMENG_PROVIDERS]
})
export class SharedAppModule { }

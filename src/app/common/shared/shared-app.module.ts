import { NgModule } from '@angular/core';
import { AuthPage } from './directives/auth-page.directive';
import { HasClaimDirective } from './directives/has-claim.directive';
import { PRIMENG_MODULE, PRIMENG_PROVIDERS } from './primeng.modules';
import { HrefPreventDefaultDirective } from './directives/href-prevent-default.directive';
import { TruncatePipe } from './pipes/truncate.pipe';
import { CurrencyInputDirective } from './directives/currency-input.directive';
import { DatesPipe } from './pipes/dates.pipe';
import { MessageService } from 'primeng/api';
import { PushNtfComponent } from './push/push-ntf.component';
import { DateFnsService } from './services/date-fns.service';
import { GlobalHttpService } from './services/generics/global-http.service';
import { MenuService } from './services/menu.service';
import { MessagingService } from './services/message.service';
import { SupabaseService } from './services/supa/supabase.service';
import UnSubscribe from './utils/unsubscribe';
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
    CurrencyInputDirective,
    UnSubscribe,
    PushNtfComponent
  ],
  exports: [
    HrefPreventDefaultDirective,
    HasClaimDirective,
    AuthPage,
    PRIMENG_MODULE,
    TruncatePipe,
    DatesPipe,
    CurrencyInputDirective,
    UnSubscribe,
    PushNtfComponent
  ],
  providers:[
    DateFnsService,
    MenuService,
    MessageService,
    MessagingService,
    GlobalHttpService,
    SupabaseService,
    PRIMENG_PROVIDERS
  ]
})
export class SharedAppModule { }

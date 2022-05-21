import { NgModule } from '@angular/core';
import { ShellAppModule } from './shell/shell.module';
import { SharedAppModule } from './shared/shared-app.module';
import { CustomAppModule } from '../modules/custom-app.module';
import { ComponentsAppModule } from './components/component.module';
import { DateFnsService } from './services/date-fns.service';
import { MenuService } from './services/menu.service';
import { MessageService } from 'primeng/api';
import { MessagingService } from './services/message.service';
import { GlobalHttpService } from './services/generics/global-http.service';
import UnSubscribe from './utils/unsubscribe';
import { PushNtfComponent } from './push/push-ntf.component';
import { SupabaseService } from './services/supa/supabase.service';

@NgModule({
  declarations:[
    UnSubscribe,
    PushNtfComponent
  ],
  imports: [
    SharedAppModule,
    CustomAppModule,
    ComponentsAppModule,
    ShellAppModule,
  ],
  exports : [
    SharedAppModule,
    ComponentsAppModule,
    ShellAppModule,
    UnSubscribe
  ],
  providers:[
    DateFnsService,
    MenuService,
    MessageService,
    MessagingService,
    GlobalHttpService,
    SupabaseService
  ]
})
export class CommonAppModule { }

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PRIMENG_MODULE, PRIMENG_PROVIDERS } from '../modules/primeng.modules';
import { DateFnsService } from '../services/date-fns.service';
import { FormlyPrimeNGCustomModule } from '../shared/formly-types/ui-primeng.module';
import { GlobalHttpService } from './services/generics/global-http.service';
import { MessagingService } from './services/message.service';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormlyPrimeNGCustomModule,
    PRIMENG_MODULE
  ],
  providers:[
      PRIMENG_PROVIDERS,
      DateFnsService,
      MessageService,
      MessagingService,
      GlobalHttpService
    ],
})
export class SharedAppModule { }

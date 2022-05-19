import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalHttpService } from '../../shared/services/generics/global-http.service';
import { TableDynamicModule, BasicDialogModule} from '../../shared/components';
import { GenericService } from '../../shared/services/general/generic.service';
import { CardModule } from 'primeng/card';
import { SimpleCrudComponent } from './simple-crud.component';
import { PRIMENG_PROVIDERS } from '../../shared/utils/primeng.modules';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: SimpleCrudComponent }]),
    FormsModule,
    ReactiveFormsModule,
    TableDynamicModule,
    CardModule,
    BasicDialogModule,
  ],
  declarations: [SimpleCrudComponent],
  providers: [PRIMENG_PROVIDERS,  GlobalHttpService, GenericService ]
})
export class SimpleCrudModule { }



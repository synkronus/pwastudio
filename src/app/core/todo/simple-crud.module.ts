import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalHttpService } from '../../modules/services/generics/global-http.service';
import { GenericService } from '../../modules/services/general/generic.service';
import { CardModule } from 'primeng/card';
import { SimpleCrudComponent } from './simple-crud.component';
import { PRIMENG_PROVIDERS } from '../../shared/primeng.modules';
import { BasicDialogModule, TableDynamicModule } from 'src/app/common/components';

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



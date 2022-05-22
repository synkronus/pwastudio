import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SimpleCrudComponent } from './simple-crud.component';
import { PRIMENG_PROVIDERS } from '../../common/shared/primeng.modules';
import { BasicDialogModule, TableDynamicModule } from 'src/app/common/components';
import { GenericService } from 'src/app/common/shared/services/general/generic.service';
import { GlobalHttpService } from 'src/app/common/shared/services/generics/global-http.service';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: SimpleCrudComponent }]),
    TableDynamicModule,
    CardModule,
    BasicDialogModule,
  ],
  declarations: [SimpleCrudComponent],
  providers: [PRIMENG_PROVIDERS,  GlobalHttpService, GenericService ]
})
export class SimpleCrudModule { }



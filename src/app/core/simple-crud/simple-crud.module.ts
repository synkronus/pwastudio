import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlobalHttpService } from '../../common/services/generics/global-http.service';
import { GenericService } from '../../common/services/general/generic.service';
import { CardModule } from 'primeng/card';
import { SimpleCrudComponent } from './simple-crud.component';
import { PRIMENG_PROVIDERS } from '../../common/shared/primeng.modules';
import { BasicDialogModule, TableDynamicModule } from 'src/app/common/components';

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



import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedAppModule } from 'src/app/common/shared/shared-app.module';
import { FormlyPrimeNGCustomModule } from 'src/app/common/components/formly-types/ui-primeng.module';
import { FormlyModule } from '@ngx-formly/core';
import { TodoService } from './todo.service';
import { TodoComponent } from './todo.component';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: TodoComponent }]),
    SharedAppModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyPrimeNGCustomModule,
    FormlyModule,
    TableModule,
    CheckboxModule
  ],
  declarations: [TodoComponent],
  providers:[TodoService]
})
export class TodoModule { }



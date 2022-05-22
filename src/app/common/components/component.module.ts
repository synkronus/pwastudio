import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyPrimeNGCustomModule } from './formly-types/ui-primeng.module';
import { TableDynamicModule } from './table/table-dynamic.module';
import { SharedAppModule } from '../shared/shared-app.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyPrimeNGCustomModule,
    SharedAppModule,
    TableDynamicModule
  ],
})
export class ComponentsAppModule { }

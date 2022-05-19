import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TableDynamicComponent } from './table-dynamic.component';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    ButtonModule, 
    TableModule, 
    ToolbarModule,
    InputTextModule,
    MultiSelectModule,
    TooltipModule,
    TranslateModule
  ],
  declarations: [TableDynamicComponent, TruncatePipe],
  exports: [TableDynamicComponent, TruncatePipe],
})
export class TableDynamicModule {}

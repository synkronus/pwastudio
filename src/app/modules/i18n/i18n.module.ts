import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangSelectorComponent } from './lang-selector.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LangSelectorComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    DropdownModule
  ],
  exports: [LangSelectorComponent, TranslateModule]
})
export class I18nModule { }

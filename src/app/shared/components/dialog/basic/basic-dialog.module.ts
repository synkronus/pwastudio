import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { BasicDialogComponent } from './basic-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGCustomModule } from 'src/app/shared/formly-types/ui-primeng.module';
import { PRIMENG_MODULE } from 'src/app/shared/utils/primeng.modules';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    PRIMENG_MODULE,
    FormlyModule,
    NgxJsonViewerModule,
    ScrollPanelModule,
    FormlyPrimeNGCustomModule
  ],
  declarations: [BasicDialogComponent],
  exports: [BasicDialogComponent],
})
export class BasicDialogModule {}

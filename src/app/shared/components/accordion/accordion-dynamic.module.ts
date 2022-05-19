import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AccordionDynamicComponent } from './accordion-dynamic.component';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  imports: [
    CommonModule, 
    ButtonModule, 
    AccordionModule,
  ],
  declarations: [],
  exports: [],
})
export class AccordionDynamicModule {}

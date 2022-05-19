import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToolBarComponent } from './tool-bar.component';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  imports: [CommonModule, ButtonModule, ToolbarModule],
  declarations: [ToolBarComponent, ],
  exports: [ToolBarComponent],
})
export class BasicToolBarModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BlockUIModule } from 'primeng/blockui';
import { OverlayLoaderComponent } from './overlay-loader.component';

@NgModule({
  imports: [
    BrowserModule,
    BlockUIModule,
  ],
  declarations:[OverlayLoaderComponent],
})
export class OverlayAppModule { }

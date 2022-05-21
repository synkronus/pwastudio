import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BlockUIModule } from 'primeng/blockui';
import { OverlayLoaderInterceptor } from './overlay-interceptor.service';
import { OverlayLoaderComponent } from './overlay-loader.component';

@NgModule({
  declarations:[OverlayLoaderComponent],
  imports: [
    BrowserModule,
    BlockUIModule,
    OverlayAppModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OverlayLoaderInterceptor,
      multi: true
    }],
})
export class OverlayAppModule { }

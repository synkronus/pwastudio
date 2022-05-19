import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'overlay-loader',
  template: `<p-blockUI [blocked]="isLoading | async" >
                <div class="loader">
                    <div class="loader__figure"></div>
                    <p class="loader__label">Cargando...</p>
                </div>
              </p-blockUI>`
})
export class OverlayLoaderComponent  {
  isLoading: Subject<boolean> = this.overlayService.isLoading;
  constructor(private overlayService: OverlayService) { }
}




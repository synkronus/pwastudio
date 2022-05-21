import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { OverlayService } from './overlay.service';

@Injectable({ providedIn: 'root' })
export class OverlayLoaderInterceptor implements HttpInterceptor {

    constructor(public overlayService: OverlayService ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!req.url.includes('/version.json') && !req.url.includes('/validacion') && !req.url.includes('/validacion')
        && !req.url.includes('/fuenteusuario') && !req.url.includes('/campoFormulario') )
      this.overlayService.show();
    return next.handle(req).pipe(
      finalize(() => this.overlayService.hide())
    );
  }

}




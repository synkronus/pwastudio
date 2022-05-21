import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoggerService } from './logger.service';
import { environment } from 'src/environments/environment';
import  { has, get } from 'lodash';

const log = new LoggerService('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error) => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    let errorMessage: string = JSON.stringify(response);
    if (!environment.production) log.error(response);
    errorMessage = this.processErrorMsg(response);
    throw errorMessage;
  }

  private processErrorMsg(err) {
    if(get(err,['status'],0) == 0 || get(err,['statusText'],'Unknown Error') === 'Unknown Error' ) return 'Intente mas tarde!.';
    let errorMessage: string = (err.error instanceof ErrorEvent) 
        ? `${JSON.stringify(err.error || err.message)}`
          : `${JSON.stringify(this.extractErrorMsg(err.error) || err.error.message)}`;
    return errorMessage;
  }

  extractErrorMsg(err) {
    let errString = ''; 
    if(has(err,'errors')){
      const error = err.errors;
      if(get(err,['title'], 'none') == 'Validation' )
       Object.keys(error).forEach(k => { errString += `${get(error,[k],'')}`; });
      else  
        errString = get(err,['detail'], 'Intente mas tarde!..');
    }else
      errString = 'Intente mas tarde!...'; 
    return errString;
  }

}

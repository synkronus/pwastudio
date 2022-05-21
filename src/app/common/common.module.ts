import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OverlayLoaderInterceptor } from '../services/http/overlay-interceptor.service';
import { ShellAppModule } from './shell/shell.module';
import { SharedAppModule } from '../shared/shared-app.module';
import { CustomAppModule } from '../modules/custom-app.module';
import { ComponentsAppModule } from './components/component.module';

@NgModule({
  imports: [
    SharedAppModule,
    CustomAppModule,
    ComponentsAppModule,
    ShellAppModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OverlayLoaderInterceptor,
      multi: true
    }],
    exports : [
      SharedAppModule,
      CustomAppModule,
      ComponentsAppModule,
      ShellAppModule,
    ],
})
export class CommonAppModule { }

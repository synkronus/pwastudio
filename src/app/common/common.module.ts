import { NgModule } from '@angular/core';
import { ShellAppModule } from './shell/shell.module';
import { SharedAppModule } from './shared/shared-app.module';
import { CustomAppModule } from '../modules/custom-app.module';
import { ComponentsAppModule } from './components/component.module';

@NgModule({
  imports: [
    SharedAppModule,
    CustomAppModule,
    ComponentsAppModule,
    ShellAppModule,
  ],
  exports : [
    CustomAppModule,
    ComponentsAppModule,
    ShellAppModule,
    SharedAppModule,
  ],
})
export class CommonAppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start.component';
import { RouterModule } from '@angular/router';
import { AuthServiceGuard } from 'src/app/services/auth/auth-service.guard';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '',canActivate: [AuthServiceGuard], component: StartComponent }])
  ],
  declarations: [ StartComponent],
})
export class StartModule { }

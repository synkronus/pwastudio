import { SharedAppModule } from 'src/app/common/shared/shared-app.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserConfigComponent } from './config/config.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyPrimeNGCustomModule } from 'src/app/common/components/formly-types/ui-primeng.module';
import { FormlyModule } from '@ngx-formly/core';
import { AccountService } from './services/account.service';
import { AvatarComponent } from './avatar/avatar.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: UserConfigComponent }]),
    SharedAppModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyPrimeNGCustomModule,
    FormlyModule
  ],
  declarations: [UserConfigComponent, AvatarComponent],
  providers:[AccountService]
})
export class AccountModule { }



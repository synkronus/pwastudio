import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlySelectModule } from '@ngx-formly/core/select';

import { PasswordModule } from 'primeng/password';

import {  FormlyConfigModule } from '../config/config.module';
import { FormlyPrimengBase } from './base.type';

@NgModule({
  declarations: [FormlyPrimengBase],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PasswordModule,
    FormlyConfigModule,
    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'password',
          component: FormlyPrimengBase,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
  // schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class PrimengBaseModule {}

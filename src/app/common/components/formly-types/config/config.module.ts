import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyWrapperFormField } from './form-field.wrapper';
import { FormlyWrapperFormFieldGroup } from './form-field-group.wrapper';
import { FormlyFieldNull } from './null.type';
import { FormlyFieldObject } from './object.type';
import { FormlyFieldMultiSchema } from './multischema.type';
import { FormlyFieldArray } from './array.type';

@NgModule({
  declarations: [FormlyWrapperFormField],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      types: [
        { name: 'null', component: FormlyFieldNull, wrappers: ['form-field'] },
        { name: 'object', component: FormlyFieldObject },
        { name: 'multischema', component: FormlyFieldMultiSchema },
        { name: 'array', component: FormlyFieldArray },
      ],
      wrappers: [
        { name: 'form-field', component: FormlyWrapperFormField, },
        { name: 'form-field-group', component: FormlyWrapperFormFieldGroup, }
      ]
    })
  ]
})
export class FormlyConfigModule {}

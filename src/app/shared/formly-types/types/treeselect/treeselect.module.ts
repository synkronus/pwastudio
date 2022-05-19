import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';

import { TreeSelectModule } from './treeselect';
import { FormlyConfigModule } from '../../config/config.module';
import { TreeSelectPrmNg } from './treeselect.type';

@NgModule({
  declarations: [TreeSelectPrmNg],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TreeSelectModule,
    FormlyConfigModule,
    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'TreeSelectPrmNg',
          component: TreeSelectPrmNg,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class TreeSelectPrmNgModule {}

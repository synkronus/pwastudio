import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { PRIMENG_MODULE } from '../../modules/primeng.modules';

import { FormlyCustomMessages } from './config/formly-custom-messages';
import { AutocompletePrimeNgType } from './types/autocomplete.type';
import { TextAreaPrmNg } from './types/textarea.type';
import { SwitchPrmNg } from './types/switch.type';
import { SliderButtonPrmNg } from './types/slider.type';
import { RatingPrmNg } from './types/rating.type';
import { RadioButtonPrmNg } from './types/radio.type';
import { PasswordPrmNg } from './types/password.type';
import { MultiSelectPrmNg } from './types/multiselect.type';
import { NumberPrmNg } from './types/number.type';
import { MaskPrmNg } from './types/mask.type';
import { ListboxPrmNg } from './types/listbox.type';
import { KnobPrmNg } from './types/knob.type';
import { InputPrmNg } from './types/input.type';
import { DropdownPrmNg } from './types/dropdown.type';
import { CurrencyPrmNg } from './types/currency.type';
import { ColorPickerPrmNg } from './types/colorpicker.type';
import { ChipsPrmNg } from './types/chips.type';
import { CheckboxPrmNg } from './types/checkbox.type';
import { CascadeSelectPrmNg } from './types/cascadeselect.type';
import { CalendarPrmNg } from './types/calendar.type';
import { FormlyConfigModule } from './config/config.module';
import { EditorPrmNg } from './types/editor.type';
import { TreeSelectPrmNgModule } from './types/treeselect/treeselect.module';

export const FormlyCustomTypes = [
  { name: 'string', extends: 'input' },
  { name: 'enum', extends: 'dropdown' },
  { name: 'boolean', extends: 'checkbox', },
  { name: 'AutocompletePrmNg', component: AutocompletePrimeNgType, wrappers: ['form-field'] },
  { name: 'TextareaPrmNg', component: TextAreaPrmNg, wrappers: ['form-field'] },
  { name: 'SwitchPrmNg', component: SwitchPrmNg, wrappers: ['form-field'] },
  { name: 'SliderPrmNg', component: SliderButtonPrmNg, wrappers: ['form-field'] },
  { name: 'RatingPrmNg', component: RatingPrmNg, wrappers: ['form-field'] },
  { name: 'RadioButtonPrmNg', component: RadioButtonPrmNg, wrappers: ['form-field'] },
  { name: 'PasswordPrmNg', component: PasswordPrmNg, wrappers: ['form-field'] },
  { name: 'MultiSelectPrmNg', component: MultiSelectPrmNg, wrappers: ['form-field'] },
  { name: 'NumberPrmNg', component: NumberPrmNg, wrappers: ['form-field'] },
  { name: 'MaskPrmNg', component: MaskPrmNg, wrappers: ['form-field'] },
  { name: 'ListboxPrmNg', component: ListboxPrmNg, wrappers: ['form-field'] },
  { name: 'KnobPrmNg', component: KnobPrmNg, wrappers: ['form-field'] },
  { name: 'InputPrmNg', component: InputPrmNg },
  { name: 'EditorPrmNg', component: EditorPrmNg, wrappers: ['form-field'] },
  { name: 'DropdownPrmNg', component: DropdownPrmNg, wrappers: ['form-field'] },
  { name: 'CurrencyPrmNg', component: CurrencyPrmNg, wrappers: ['form-field'] },
  { name: 'ColorPickerPrmNg', component: ColorPickerPrmNg, wrappers: ['form-field'] },
  { name: 'ChipsPrmNg', component: ChipsPrmNg, wrappers: ['form-field'] },
  { name: 'CheckboxPrmNg', component: CheckboxPrmNg, wrappers: ['form-field'] },
  { name: 'CascadeSelectPrmNg', component: CascadeSelectPrmNg, wrappers: ['form-field'] },
  { name: 'CalendarPrmNg', component: CalendarPrmNg, wrappers: ['form-field'] },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PRIMENG_MODULE,
    FormlyConfigModule,
    FormlyModule.forRoot({
      extras: { lazyRender: true },
      validationMessages: [...FormlyCustomMessages],
      types: [...FormlyCustomTypes],
    }),
    FormlyPrimeNGModule,
    TreeSelectPrmNgModule
  ],
  declarations: [
    AutocompletePrimeNgType,
    TextAreaPrmNg,
    SwitchPrmNg,
    SliderButtonPrmNg,
    RatingPrmNg,
    RadioButtonPrmNg,
    PasswordPrmNg,
    MultiSelectPrmNg,
    NumberPrmNg,
    MaskPrmNg,
    ListboxPrmNg,
    KnobPrmNg,
    InputPrmNg,
    DropdownPrmNg,
    CurrencyPrmNg,
    ColorPickerPrmNg,
    ChipsPrmNg,
    CheckboxPrmNg,
    CascadeSelectPrmNg,
    CalendarPrmNg,
    EditorPrmNg
  ]
})
export class FormlyPrimeNGCustomModule {}

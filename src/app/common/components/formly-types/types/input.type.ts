import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { PrimengComponentType } from './prime-base.type';

/*
  Common Key Filter
  pint: Positive integers
  int: Integers
  pnum: Positive numbers
  num: Numbers
  hex: Hexadecimal
  email: Email
  alpha: Alphabetic
  alphanum: Alphanumeric
*/

@Component({
  selector: 'primeng-input',
  template: `
    <input
      #input
      pInputText
      [style]="{ width: '100%' }"
      [type]="'text'"
      [disabled]="to.disabled || false"
      (change)="to.change && to.change(field, $event)"
      (focus)="to.focus && to.focus(field, $event)"
      (blur)="to.blur && to.blur(field, $event)"
      [formControl]="formControl"
      [formlyAttributes]="field"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPrmNg extends PrimengComponentType {
  @ViewChild('input') input!: ElementRef;
}

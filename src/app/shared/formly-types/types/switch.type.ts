import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { InputSwitch } from 'primeng/inputswitch';
import { PrimengComponentType } from './prime-base.type';

@Component({
  selector: 'primeng-switch',
  template: `
    <p-inputSwitch
      [tabindex]="to.tabindex || null"
      [disabled]="to.disabled || false"
      [required]="to.required || false"
      [formControl]="formControl"
    >
    </p-inputSwitch>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchPrmNg extends PrimengComponentType {
  @ViewChild(InputSwitch) switch!: InputSwitch;
}

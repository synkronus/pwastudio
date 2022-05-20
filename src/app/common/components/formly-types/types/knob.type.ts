import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Knob } from 'primeng/knob';
import { PrimengComponentType } from './prime-base.type';

@Component({
  selector: 'primeng-knob',
  template: `
    <p-knob
      [tabindex]="to.tabindex || null"
      [disabled]="to.disabled || false"
      [required]="to.required || false"
      (onChange)="to.onChange && to.onChange(field, $event)"
      [formControl]="formControl"
    >
    </p-knob>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KnobPrmNg extends PrimengComponentType {
  @ViewChild(Knob) knob!: Knob;
}

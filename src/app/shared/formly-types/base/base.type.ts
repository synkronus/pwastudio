import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PrimengComponentType } from '../types/prime-base.type';

@Component({
  selector: 'formly-primeng-base',
  template: `
    <p-base
      [tabindex]="to.tabindex || null"
      [disabled]="to.disabled || false"
      [required]="to.required || false"
      [formControl]="formControl"
    >
    </p-base>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyPrimengBase extends PrimengComponentType {
  //@ViewChild(Base) password!: Base;
}

// [placeholder]="to.placeholder"

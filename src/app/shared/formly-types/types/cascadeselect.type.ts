import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CascadeSelect } from 'primeng/cascadeselect';
import { PrimengComponentType } from './prime-base.type';

@Component({
  selector: 'primeng-cascadeSelect',
  template: `
    <p-cascadeSelect
      appendTo="body"

      [disabled]="to.disabled"
      (onChange)="to.onChange && to.onChange(field, $event)"
      (onGroupChange)="to.onGroupChange && to.onGroupChange(field, $event)"
      (onBeforeShow)="to.onBeforeShow && to.onBeforeShow(field, $event)"
      (onBeforeHide)="to.onBeforeHide && to.onBeforeHide(field, $event)"
      (onShow)="to.onShow && to.onShow(field, $event)"
      (onHide)="to.onHide && to.onHide(field, $event)"
      [formControl]="formControl"
      [formlyAttributes]="field"
    >
    </p-cascadeSelect>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CascadeSelectPrmNg extends PrimengComponentType {
  @ViewChild(CascadeSelect) cascadeSelect!: CascadeSelect;
  defaultOptions = {
    templateOptions: {
      options: [],
    },
  };
}
// [placeholder]="to.placeholder"
// [options]="to.options | formlySelectOptions: field | async"

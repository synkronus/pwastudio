import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AutoComplete } from 'primeng/autocomplete';
import { PrimengComponentType } from './prime-base.type';

@Component({
  selector: 'primeng-autoComplete',
  template: `
    <p-autoComplete
      field="label"
      [dataKey]="'value'"
      [forceSelection]="true"
      [suggestions]="to.results"
      [style]="{'width':'100%'}"
      [inputStyle]="{'width':'100%'}"
      (completeMethod)="to.searchObject(to, $event)"

      [placeholder]="to.placeholder"
      [tabindex]="to.tabindex || null"
      [disabled]="to.disabled || false"
      [required]="to.required || false"
      [showEmptyMessage]="to.showEmptyMessage || false"
      [emptyMessage]="to.emptyMessage"
      [suggestions]="to.options | async"
      [multiple]="to.multiple || false"
      [dropdown]="to.dropdown || false"

      [forceSelection]="to.forceSelection || false"
      [autofocus]="to.autofocus || false"
      (completeMethod)="to.completeMethod && to.completeMethod(field, $event)"
      (onFocus)="to.onFocus && to.onFocus(field, $event)"

      (onBlur)="to.onBlur && to.onBlur(field, $event)"
      (onKeyUp)="to.onKeyUp && to.onKeyUp(field, $event)"
      (onSelect)="to.onSelect && to.onSelect(field, $event)"
      (onUnselect)="to.onUnselect && to.onUnselect(field, $event)"

      (onDropdownClick)="to.onDropdownClick && to.onDropdownClick(field, $event)"
      (onClear)="to.onClear && to.onClear(field, $event)"
      (onShow)="to.onShow && to.onShow(field, $event)"
      (onHide)="to.onHide && to.onHide(field, $event)"
      [formControl]="formControl"
      [formlyAttributes]="field"
    >
    </p-autoComplete>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompletePrimeNgType extends PrimengComponentType {
  @ViewChild(AutoComplete) autoComplete!: AutoComplete;
  defaultOptions = {
    templateOptions: {
      options: [],
    },
  };
}

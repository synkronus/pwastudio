import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  OnDestroy,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { Editor } from 'primeng/editor';
import { PrimengComponentType } from './prime-base.type';

@Component({
  selector: 'primeng-editor',
  template: `
    <p-editor
      [placeholder]="to.placeholder"
      [style]="to.style || null"
      [styleClass]="to.styleClass || null"
      [readonly]="to.readonly || false"
      [formats]="to.formats || null"
      [modules]="to.modules || null"
      [debug]="to.debug || null"
      (onTextChange)="to.onTextChange && to.onTextChange(field, $event)"
      (onSelectionChange)="to.onSelectionChange && to.onSelectionChange(field, $event)"
      (onInit)="to.onInit && to.onInit(field, $event)"
      [formControl]="formControl"
      [formlyAttributes]="field"
    ></p-editor>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorPrmNg extends PrimengComponentType {
  @ViewChild(Editor) editor!: Editor;
  getQuill() {
    return this.editor.getQuill();
  }
}

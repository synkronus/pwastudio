import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { PrimengComponentType } from '../prime-base.type';
import { TreeSelect } from './treeselect';

@Component({
  selector: 'primeng-treeselect',
  template: `
    <p-treeSelect
      appendTo="body"
      [placeholder]="to.placeholder"
      [options]="to.options | async"
      [display]="to.display || 'comma'"
      [selectionMode]="to.selectionMode || 'single'"
      [metaKeySelection]="to.metaKeySelection ?? true"
      [emptyMessage]="to.emptyMessage || 'No results found'"
      [propagateSelectionDown]="to.propagateSelectionDown ?? true"
      [propagateSelectionUp]="to.propagateSelectionUp ?? true"
      [disabled]="to.disabled"
      (onShow)="to.onShow && to.onShow(field, $event)"
      (onHide)="to.onHide && to.onHide(field, $event)"
      (onNodeSelect)="to.onNodeSelect && to.onNodeSelect(field, $event)"
      (onNodeUnselect)="to.onNodeUnselect && to.onNodeUnselect(field, $event)"
      (onNodeExpand)="to.onNodeExpand && to.onNodeExpand(field, $event)"
      (onNodeCollapse)="to.onNodeCollapse && to.onNodeCollapse(field, $event)"
      [formControl]="formControl"
      [formlyAttributes]="field"
      treeSelect
    >
    </p-treeSelect>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeSelectPrmNg extends PrimengComponentType {
  @ViewChild(TreeSelect) treeselect!: TreeSelect;
  defaultOptions = {
    templateOptions: {
      options: [],
    },
  };
}

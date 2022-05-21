import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import UnSubscribe from 'src/app/common/utils/unsubscribe';

@Component({
  selector: 'app-basic-dialog',
  templateUrl: './basic-dialog.component.html',
  styleUrls: ['./basic-dialog.component.scss'],
})
export class BasicDialogComponent extends UnSubscribe implements OnInit {

  @Input() config;
  @Output() onSave = new EventEmitter<any>();
  form = new FormGroup({});
  model = {};

  constructor() { super(); }

  ngOnInit(): void {
    this.resetForm();
  }

  onShowDialog(e) { }

  onHideDialog(e) {
    this.resetForm();
  }

  private resetForm() {
    this.form.reset();
  }

  onSubmit() {
    if (this.form.valid) {
      this.onSave.emit({formObj : this.form, vm : this.model});
      setTimeout(() => this.resetForm() , 300);
    }
  }


}

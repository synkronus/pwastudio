import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import UnSubscribe from 'src/app/common/shared/utils/unsubscribe';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent extends UnSubscribe implements OnInit {

  @Input() config;

  @Output() OnCreate = new EventEmitter<any>();

  constructor() { super(); }

  ngOnInit() { }

  OnCreateAction(row, mode) {
      this.OnCreate.emit({row, mode});
  }

  OnFilterAction(row, mode) {
  }


}

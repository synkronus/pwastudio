import { Component, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';

@Component({template: ''})
export default class UnSubscribe implements OnDestroy {
  subSink = new SubSink();
  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}

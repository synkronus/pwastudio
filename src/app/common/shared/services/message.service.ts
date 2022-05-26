import { TranslateService } from '@ngx-translate/core';

import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import UnSubscribe from '../utils/unsubscribe';
import { MsgConfirmPopOver } from '../models/common.models';


export const MSG_UTILS = {
  WARN: 'warn',
  SUCCESS: 'success',
  ERROR: 'error',
};


@Injectable({
  providedIn: 'root'
})
export class MessagingService extends UnSubscribe {

  constructor(private msgSvc: MessageService, private translate: TranslateService) {
      super();
   }

  add(severity: string, summary: string, detail: string) {
    this.msgSvc.add({ life:6000, key: 'gbl-toast', severity, summary, detail });
  }

  showError(err: any, titleKey: string) {
    let titleMsg: string, failedMsg = ` : ${err}`;
    const errorKey = 'messages.error';
    this.subSink.sink = this.translate.get([titleKey, errorKey]).subscribe((x: string[]) => {
      titleMsg = x[titleKey];
      failedMsg = x[errorKey] + failedMsg;
    });
    this.add('error', titleMsg, failedMsg);
  }

  showSuccess(titleKey: string, successKey: string) {
    let titleMsg: string, successMsg: string;
    this.subSink.sink = this.translate.get([titleKey, successKey]).subscribe((x: string[]) => {
      titleMsg = x[titleKey];
      successMsg = x[successKey];
    });
    this.add('success', titleMsg, successMsg);
  }

  getDialogTitle(actionMdl: string, titleKey: string): string {
    let title = '';
    this.subSink.sink = this.translate.get(titleKey).subscribe((x: string) => title = x.toLowerCase());
    this.subSink.sink = this.translate.get(actionMdl === "edit" ? 'actions.edit' : 'actions.create').subscribe((x: string) => {
      title = `${x} ${title}`;
    });
    return title;
  }

  getcharacterRange(minLength: number, maxLength: number) {
    let value: string;
    this.subSink.sink = this.translate.get('validations.characterRange').subscribe((x: string) => value = x);
    value = value.replace('minLength', `${minLength}`).replace('maxLength', `${maxLength}`);
    return value;
  }

  confirmPopOverWrap (): MsgConfirmPopOver {
  return {
      key: '',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      message: 'Esta seguro de elimar este item?',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept'
    }
  }

}



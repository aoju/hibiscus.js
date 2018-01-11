import {Component, EventEmitter} from '@angular/core';
import {Modal, ModalDismissReasons} from '../modal';
import {DialogOptions} from './dialog-options.model';
import {HiNGConfig} from '../hi.config';

@Component({
  selector: 'hi-confirm-dialog',
  templateUrl: './confirm-dialog.template.html'
})
export class ConfirmDialogComponent implements Modal {
  context: DialogOptions;
  dismiss: EventEmitter<any>;
  btnYes: string;
  btnNo: string;
  btnYesType: string;
  btnNoType: string;

  constructor(private hiNGConfig: HiNGConfig) {
    this.btnYes = hiNGConfig.dialog.button.yes;
    this.btnYesType = hiNGConfig.dialog.button.btnYesType;
    this.btnNo = hiNGConfig.dialog.button.no;
    this.btnNoType = hiNGConfig.dialog.button.btnNoType;
  }

  yes() {
    this.dismiss.emit(ModalDismissReasons.YES);
  }

  no() {
    this.dismiss.error(ModalDismissReasons.NO);
  }

}

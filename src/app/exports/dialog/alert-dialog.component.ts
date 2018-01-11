import {Component, EventEmitter} from '@angular/core';
import {Modal, ModalDismissReasons} from '../modal';
import {DialogOptions} from './dialog-options.model';
import {HiNGConfig} from '../hi.config';

@Component({
  selector: 'hi-alert-dialog',
  templateUrl: './alert-dialog.template.html',
  styleUrls: ['./dialog.template.scss'],
})
export class AlertDialogComponent implements Modal {
  context: DialogOptions;
  dismiss: EventEmitter<any>;
  btnYes: string;
  btnYesType: string;

  constructor(private hiNGConfig: HiNGConfig) {
    this.btnYes = hiNGConfig.dialog.button.yes;
    this.btnYesType = hiNGConfig.dialog.button.btnYesType;
  }

  yes() {
    this.dismiss.emit(ModalDismissReasons.YES);
  }

  no() {
    this.dismiss.error(ModalDismissReasons.NO);
  }
}

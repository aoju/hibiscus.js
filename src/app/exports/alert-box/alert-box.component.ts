import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {HiNGConfig} from '../hi.config';

@Component({
  selector: 'hi-alert-box',
  templateUrl: './alert-box.template.html',
  exportAs: 'alertBox',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertBoxComponent {
  @Input() type: 'success' | 'info' | 'warning' | 'danger' = 'info';
  @Input() cssClass: string;
  @Input() closable: boolean;
  @Output() close = new EventEmitter<any>();

  constructor(hiNGConfig: HiNGConfig) {
    this.type = <any>hiNGConfig.alertBox.type;
    this.closable = hiNGConfig.alertBox.closable;
  }

  closeBox() {
    this.onCloseBox();
  }

  private onCloseBox() {
    this.close.emit(this);
  }
}

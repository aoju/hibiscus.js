import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { fadeAnimation } from '../common/animation/fade-animations';
import { toBoolean } from '../common/util/convert';
import { HiToolTipComponent } from '../tooltip/hi-tooltip.component';

@Component({
  selector           : 'hi-popconfirm',
  preserveWhitespaces: false,
  animations         : [ fadeAnimation ],
  templateUrl        : './hi-popconfirm.component.html',
  styles             : [ `
    .hi-popover {
      position: relative;
    }
  ` ]
})
export class HiPopconfirmComponent extends HiToolTipComponent {
  private _condition = false;
  _prefix = 'hi-popover-placement';
  _trigger = 'click';
  _hasBackdrop = true;
  option = {
    okText: '确定',
    cancelText: '取消'
  }
  @Input() hiContent;
  @Input() hiOkText: string;
  @Input() hiCancelText: string;

  @Input()
  set hiCondition(value: boolean) {
    this._condition = toBoolean(value);
  }

  @Output() hiOnCancel: EventEmitter<void> = new EventEmitter();
  @Output() hiOnConfirm: EventEmitter<void> = new EventEmitter();

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

  show(): void {
    if (!this._condition) {
      this.hiVisible = true;
    } else {
      this.onConfirm();
    }
  }

  onCancel(): void {
    this.hiOnCancel.emit();
    this.hiVisible = false;
  }

  onConfirm(): void {
    this.hiOnConfirm.emit();
    this.hiVisible = false;
  }
}

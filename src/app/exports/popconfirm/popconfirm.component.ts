import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { fadeAnimation } from '../common/animation/fade-animations';
import { toBoolean } from '../utils/convert';
import { TooltipComponent } from '../tooltip/tooltip.component';

@Component({
  selector           : 'hi-popconfirm',
  preserveWhitespaces: false,
  animations         : [ fadeAnimation ],
  templateUrl        : './popconfirm.component.html',
  styleUrls: ['./popconfirm.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PopconfirmComponent extends TooltipComponent {
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

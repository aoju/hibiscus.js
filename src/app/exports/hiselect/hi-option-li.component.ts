import { Component, ElementRef, Input } from '@angular/core';
import { HiOptionComponent } from './hi-option.component';

@Component({
  selector: '[hi-option-li]',
  template: `
    <ng-container *ngIf="hiOption.hiCustomContent">
      <ng-template [ngTemplateOutlet]="hiOption.template"></ng-template>
    </ng-container>
    <ng-container *ngIf="!hiOption.hiCustomContent">
      {{hiOption.hiLabel}}
    </ng-container>
  `,
  host    : {
    '[class.ant-select-dropdown-menu-item]'         : 'true',
    '[class.ant-select-dropdown-menu-item-selected]': 'selected && !hiOption.hiDisabled',
    '[class.ant-select-dropdown-menu-item-disabled]': 'hiOption.hiDisabled',
    '[class.ant-select-dropdown-menu-item-active]'  : 'active && !hiOption.hiDisabled && hiShowActive && !selected',
    '[attr.unselectable]'                           : '"unselectable"',
    '[style.user-select]'                           : '"none"'
  }
})
export class HiOptionLiComponent {
  el: Element;
  selected = false;
  active = false;
  @Input() hiOption: HiOptionComponent;
  @Input() hiShowActive = true;
  // tslint:disable-next-line:no-any
  @Input() compareWith: (o1: any, o2: any) => boolean;

  @Input()
  set hiActiveOption(value: HiOptionComponent) {
    if (value) {
      this.active = this.compareWith(value.hiValue, this.hiOption.hiValue);
    } else {
      this.active = false;
    }
  }

  @Input()
  // tslint:disable-next-line:no-any
  set hiListOfSelectedValue(valueList: any[]) {
    this.selected = valueList.find(v => this.compareWith(v, this.hiOption.hiValue));
  }

  constructor(private elementRef: ElementRef) {
    this.el = elementRef.nativeElement;
  }
}

import { Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { HiOptionComponent } from './hi-option.component';

@Component({
  selector: 'hi-option-group',
  template: `
    <ng-content></ng-content>`
})
export class HiOptionGroupComponent {
  _label: string | TemplateRef<void>;
  isLabelString: boolean;
  @ContentChildren(HiOptionComponent) listOfHiOptionComponent: QueryList<HiOptionComponent>;

  @Input()
  set hiLabel(value: string | TemplateRef<void>) {
    this.isLabelString = !(value instanceof TemplateRef);
    this._label = value;
  }

  get hiLabel(): string | TemplateRef<void> {
    return this._label;
  }

}

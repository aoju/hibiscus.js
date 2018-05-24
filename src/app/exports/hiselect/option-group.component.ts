import { Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { OptionComponent } from './option.component';

@Component({
  selector: 'hi-option-group',
  template: `
    <ng-content></ng-content>`
})
export class OptionGroupComponent {
  _label: string | TemplateRef<void>;
  isLabelString: boolean;
  @ContentChildren(OptionComponent) listOfHiOptionComponent: QueryList<OptionComponent>;

  @Input()
  set hiLabel(value: string | TemplateRef<void>) {
    this.isLabelString = !(value instanceof TemplateRef);
    this._label = value;
  }

  get hiLabel(): string | TemplateRef<void> {
    return this._label;
  }

}

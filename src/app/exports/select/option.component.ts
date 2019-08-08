import {Component, Input, TemplateRef, ViewChild} from '@angular/core';

import {toBoolean} from '../utils/convert';

@Component({
  selector: 'hi-option',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>`
})
export class OptionComponent {
  private _disabled = false;
  private _customContent = false;
  @ViewChild(TemplateRef, {static: false}) template: TemplateRef<void>;
  @Input() hiLabel: string;
  // tslint:disable-next-line:no-any
  @Input() hiValue: any;

  @Input()
  set hiDisabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get hiDisabled(): boolean {
    return this._disabled;
  }

  @Input()
  set hiCustomContent(value: boolean) {
    this._customContent = toBoolean(value);
  }

  get hiCustomContent(): boolean {
    return this._customContent;
  }
}

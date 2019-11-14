import {Component, Input, ChangeDetectionStrategy, forwardRef, ChangeDetectorRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {HiNGConfig} from '../hi.config';

@Component({
  selector: 'hi-switch',
  templateUrl: './switch.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SwitchComponent),
    multi: true
  }]
})
export class SwitchComponent implements ControlValueAccessor {
  @Input() type: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger';
  @Input() size: 'lg' | 'sm' | 'xs';
  @Input() disabled: boolean;
  @Input() onText: string;
  @Input() offText: string;
  @Input() cssClass: string;
  checked: boolean;
  private onChange = (_: any) => null;
  private onTouched = () => null;

  constructor(hiNGConfig: HiNGConfig, private changeDetectorRef: ChangeDetectorRef) {
    this.onText = hiNGConfig.switchBtn.onText;
    this.offText = hiNGConfig.switchBtn.offText;
    this.type = <any>hiNGConfig.switchBtn.type;
  }

  toggle() {
    if (this.disabled) {
      return;
    }
    this.onTouched();
    this.checked = !this.checked;
    this.onChange(this.checked);
  }

  writeValue(obj: any): void {
    this.checked = obj;
    this.changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}

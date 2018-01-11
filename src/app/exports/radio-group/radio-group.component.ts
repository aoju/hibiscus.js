import {
  Component, ChangeDetectionStrategy, forwardRef, Input, ChangeDetectorRef, EventEmitter,
  Output
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {HiNGConfig} from '../hi.config';

@Component({
  selector: 'hi-radio-group',
  templateUrl: './radio-group.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'[class]': 'cssClass'},
  exportAs: 'radioGroup',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioGroupComponent),
    multi: true
  }]
})
export class RadioGroupComponent implements ControlValueAccessor {
  static NAME_SEED = 0;
  @Input() disabled = false;
  @Input() options: any[];
  @Input() inline: boolean;
  @Input() cssClass: string;
  @Input() formatter: (item: any) => string;
  @Input() valueParser: (item: any) => any;
  @Output() valueChange = new EventEmitter<any>();
  name: string;
  value: any;
  private onChange = (_: any) => null;
  private onTouched = () => null;

  constructor(hiNGConfig: HiNGConfig, private changeDetectorRef: ChangeDetectorRef) {
    this.formatter = hiNGConfig.radioGroup.formatter;
    this.valueParser = hiNGConfig.radioGroup.valueParser;
    this.name = `hi-radio-group-${RadioGroupComponent.NAME_SEED++}`;
  }

  writeValue(obj: any): void {
    this.value = obj;
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

  onRadioChange(item: any) {
    this.onTouched();
    this.value = this.valueParser(item);
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  isChecked(item: any) {
    return this.value === this.valueParser(item);
  }
}

import {Directive, Inject, Input, LOCALE_ID} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';
import {
  includesValidator,
  equalToValidator,
  rangeLengthValidator,
  minValidator,
  maxValidator,
  rangeValidator,
  digitsValidator,
  numberValidator,
  urlValidator,
  emailValidator,
  dateValidator,
  dateISOValidator,
  jsonValidator,
  base64Validator,
  phoneValidator,
  uuidValidator,
  equalValidator,
  beforeDateValidator,
  afterDateValidator,
  requiredWithTrim
} from './validators';

@Directive({
  selector: '[hiRequiredWithTrim]',
  providers: [{provide: NG_VALIDATORS, useExisting: RequiredWithTrimDirective, multi: true}]
})
export class RequiredWithTrimDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | any {
    return requiredWithTrim(control);
  }
}

@Directive({
  selector: '[hiRangeLength]',
  providers: [{provide: NG_VALIDATORS, useExisting: RangeLengthDirective, multi: true}]
})
export class RangeLengthDirective implements Validator {

  @Input() hiRangeLength: number[];

  validate(control: AbstractControl): ValidationErrors | any {
    return rangeLengthValidator(this.hiRangeLength)(control);
  }
}

@Directive({
  selector: '[hiMin]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinDirective, multi: true}]
})
export class MinDirective implements Validator {

  @Input() hiMin: number;

  validate(control: AbstractControl): ValidationErrors | any {
    return minValidator(this.hiMin)(control);
  }
}

@Directive({
  selector: '[hiMax]',
  providers: [{provide: NG_VALIDATORS, useExisting: MaxDirective, multi: true}]
})
export class MaxDirective implements Validator {

  @Input() hiMax: number;

  validate(control: AbstractControl): ValidationErrors | any {
    return maxValidator(this.hiMax)(control);
  }
}

@Directive({
  selector: '[hiRange]',
  providers: [{provide: NG_VALIDATORS, useExisting: RangeDirective, multi: true}]
})
export class RangeDirective implements Validator {

  @Input() hiRange: number[];

  validate(control: AbstractControl): ValidationErrors | any {
    return rangeValidator(this.hiRange)(control);
  }
}

@Directive({
  selector: '[hiDigits]',
  providers: [{provide: NG_VALIDATORS, useExisting: DigitsDirective, multi: true}]
})
export class DigitsDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | any {
    return digitsValidator()(control);
  }
}

@Directive({
  selector: '[hiNumber]',
  providers: [{provide: NG_VALIDATORS, useExisting: NumberDirective, multi: true}]
})
export class NumberDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | any {
    return numberValidator()(control);
  }
}

@Directive({
  selector: '[hiUrl]',
  providers: [{provide: NG_VALIDATORS, useExisting: UrlDirective, multi: true}]
})
export class UrlDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | any {
    return urlValidator()(control);
  }
}

@Directive({
  selector: '[hiEmail]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmailDirective, multi: true}]
})
export class EmailDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | any {
    return emailValidator()(control);
  }
}

@Directive({
  selector: '[hiDate]',
  providers: [{provide: NG_VALIDATORS, useExisting: DateDirective, multi: true}]
})
export class DateDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | any {
    return dateValidator()(control);
  }
}

@Directive({
  selector: '[hiDateISO]',
  providers: [{provide: NG_VALIDATORS, useExisting: DateISODirective, multi: true}]
})
export class DateISODirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | any {
    return dateISOValidator()(control);
  }
}

@Directive({
  selector: '[hiJson]',
  providers: [{provide: NG_VALIDATORS, useExisting: JsonDirective, multi: true}]
})
export class JsonDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | any {
    return jsonValidator()(control);
  }
}

@Directive({
  selector: '[hiBase64]',
  providers: [{provide: NG_VALIDATORS, useExisting: Base64Directive, multi: true}]
})
export class Base64Directive implements Validator {

  validate(control: AbstractControl): ValidationErrors | any {
    return base64Validator()(control);
  }
}

@Directive({
  selector: '[hiPhone]',
  providers: [{provide: NG_VALIDATORS, useExisting: PhoneDirective, multi: true}]
})
export class PhoneDirective implements Validator {

  @Input() hiPhone: string;

  constructor(@Inject(LOCALE_ID) private locale: string) {
  }

  validate(control: AbstractControl): ValidationErrors | any {
    return phoneValidator(this.hiPhone || this.locale)(control);
  }
}

@Directive({
  selector: '[hiUUID]',
  providers: [{provide: NG_VALIDATORS, useExisting: UUIDDirective, multi: true}]
})
export class UUIDDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | any {
    return uuidValidator()(control);
  }
}

@Directive({
  selector: '[hiEqual]',
  providers: [{provide: NG_VALIDATORS, useExisting: EqualDirective, multi: true}]
})
export class EqualDirective implements Validator {

  @Input() hiEqual: any;

  validate(control: AbstractControl): ValidationErrors | any {
    return equalValidator(this.hiEqual)(control);
  }
}

@Directive({
  selector: '[hiIncludes]',
  providers: [{provide: NG_VALIDATORS, useExisting: IncludesDirective, multi: true}]
})
export class IncludesDirective implements Validator {

  @Input() hiIncludes: any[];

  validate(control: AbstractControl): ValidationErrors | any {
    return includesValidator(this.hiIncludes)(control);
  }
}

@Directive({
  selector: '[hiEqualTo]',
  providers: [{provide: NG_VALIDATORS, useExisting: EqualToDirective, multi: true}]
})
export class EqualToDirective implements Validator {
  private validatorFn: ValidatorFn;

  @Input()
  set hiEqualTo(target: AbstractControl | string) {
    this.validatorFn = equalToValidator(target);
  }

  validate(control: AbstractControl): ValidationErrors | any {
    return this.validatorFn(control);
  }
}

@Directive({
  selector: '[hiBeforeDate]',
  providers: [{provide: NG_VALIDATORS, useExisting: BeforeDateDirective, multi: true}]
})
export class BeforeDateDirective implements Validator {
  private validatorFn: ValidatorFn;

  @Input()
  set hiBeforeDate(target: string | Date | number) {
    this.validatorFn = beforeDateValidator(target);
  }

  validate(control: AbstractControl): ValidationErrors | any {
    return this.validatorFn(control);
  }
}

@Directive({
  selector: '[hiAfterDate]',
  providers: [{provide: NG_VALIDATORS, useExisting: AfterDateDirective, multi: true}]
})
export class AfterDateDirective implements Validator {
  private validatorFn: ValidatorFn;

  @Input()
  set hiAfterDate(target: string | Date | number) {
    this.validatorFn = afterDateValidator(target);
  }

  validate(control: AbstractControl): ValidationErrors | any {
    return this.validatorFn(control);
  }

}

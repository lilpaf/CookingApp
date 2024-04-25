import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[numberValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: NumberValidatorDirective,
      multi: true,
    },
  ],
})
export class NumberValidatorDirective implements Validator {
  validate(control: AbstractControl<any, any>): ValidationErrors {
    if (control.value <= 0) {
      return { invalidNumber: true };
    }
    return null;
  }

  static validate(control: AbstractControl<any, any>): ValidationErrors {
    if (control.value <= 0) {
      return { invalidNumber: true };
    }
    return null;
  }
}

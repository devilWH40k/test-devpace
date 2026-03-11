import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ContactValidators {
  static atLeastOneControl(controlName1: string, controlName2: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value1 = control.get(controlName1)?.value;
      const value2 = control.get(controlName2)?.value;

      return value1 || value2 ? null : { requireAtLeastOneContact: true };
    };
  }
}

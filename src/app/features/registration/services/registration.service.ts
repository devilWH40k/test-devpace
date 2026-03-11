import { Injectable, signal, computed, Signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FORM_WEIGHTS } from '../../../core/constants/validation.constants';
import { toSignal } from '@angular/core/rxjs-interop';
// import { debounceTime } from 'rxjs/internal/operators/debounceTime';
// import { startWith } from 'rxjs/internal/operators/startWith';
// import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
// import { map } from 'rxjs/internal/operators/map';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  private readonly _isSubmitting = signal<boolean>(false);
  private readonly _registrationSuccess = signal<boolean>(false);

  readonly isSubmitting = this._isSubmitting.asReadonly();
  readonly registrationSuccess = this._registrationSuccess.asReadonly();

  // getCompletenessSignal(form: FormGroup): Signal<number> {
  //   const debouncedState$ = form.valueChanges.pipe(
  //     debounceTime(300),
  //     startWith(form.value),
  //     map(() => this.calculateScore(form))
  //   );

  //   return toSignal(debouncedState$, { initialValue: 0 });
  // }

  // private calculateScore(form: FormGroup): number {
  //   let score = 0;

  //   if (form.get('fullName')?.valid) score += FORM_WEIGHTS.FULL_NAME;

  //   const contactValid = !form.errors?.['requireAtLeastOneContact'];
  //   if (contactValid && form.get('email')?.valid && form.get('phone')?.valid) {
  //     score += FORM_WEIGHTS.CONTACT;
  //   }

  //   if (form.get('specialization')?.valid) score += FORM_WEIGHTS.SPECIALIZATION;

  //   const skillsArray = form.get('skills');
  //   if (skillsArray && skillsArray.valid && skillsArray.value?.length > 0) {
  //     score += FORM_WEIGHTS.SKILLS;
  //   }

  //   return Math.min(score, 100);
  // }

  getCompletenessSignal(form: FormGroup): Signal<number> {
    const formState = toSignal(form.valueChanges, { initialValue: form.value });

    return computed(() => {
      const _ = formState();

      let score = 0;

      if (form.get('fullName')?.valid) score += FORM_WEIGHTS.FULL_NAME;

      const emailValid = form.get('email')?.valid;
      const phoneValid = form.get('phone')?.valid;
      const contactValid = !form.errors?.['requireAtLeastOneContact'];
      if (contactValid && emailValid && phoneValid) {
         score += FORM_WEIGHTS.CONTACT;
      }

      if (form.get('specialization')?.valid) score += FORM_WEIGHTS.SPECIALIZATION;

      const skillsArray = form.get('skills');
      if (skillsArray && skillsArray.valid && skillsArray.value?.length > 0) {
        score += FORM_WEIGHTS.SKILLS;
      }

      return Math.min(score, 100);
    });
  }

  setSuccess(value: boolean): void {
    this._registrationSuccess.set(value);
  }
}

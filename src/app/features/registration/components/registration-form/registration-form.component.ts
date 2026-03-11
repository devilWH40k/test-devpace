// src/app/features/registration/components/registration-form.component.ts
import { Component, inject, Signal, computed, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Specialization } from '../../../../core/models/specialization.enum';
import { VALIDATION_PATTERNS } from '../../../../core/constants/validation.constants';
import { ContactValidators } from '../../../../core/utils/contact-validator.util';
import { RegistrationService } from '../../services/registration.service';
import { RegistrationFormSchema, RegistrationSubmitData } from '../../models/registration-form.model';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbModule],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly registrationService = inject(RegistrationService);
  readonly formSubmitted = output<RegistrationSubmitData>();

  readonly Specialization = Specialization;
  readonly SpecializationOptions = Object.values(Specialization);
  readonly registrationForm: FormGroup<RegistrationFormSchema>;

  readonly successSignal = this.registrationService.registrationSuccess;
  readonly completenessSignal: Signal<number>;

  readonly selectedSpecialization: Signal<Specialization | null>;
  readonly isFrontendSelected = computed(() => this.selectedSpecialization() === Specialization.FRONTEND);

  constructor() {
    this.registrationForm = this.fb.group<RegistrationFormSchema>({
      fullName: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      email: this.fb.control('', [Validators.pattern(VALIDATION_PATTERNS.EMAIL)]),
      phone: this.fb.control('', [Validators.pattern(VALIDATION_PATTERNS.PHONE)]),
      specialization: this.fb.control(null, [Validators.required]),
      favoriteFramework: this.fb.control(''),
      skills: this.fb.array<FormControl<string>>([])
    }, {
      validators: [ContactValidators.atLeastOneControl('email', 'phone')]
    });

    this.completenessSignal = this.registrationService.getCompletenessSignal(this.registrationForm);

    this.selectedSpecialization = toSignal(
      this.registrationForm.get('specialization')!.valueChanges,
      { initialValue: null }
    );
  }

  public addSkill(): void {
    this.skillsControl.push(this.fb.control('', Validators.required));
  }

  public removeSkill(index: number): void {
    this.skillsControl.removeAt(index);
  }

  submit(): void {
    if (!this.registrationForm.valid) return;

    const formData = this.registrationForm.getRawValue() as RegistrationSubmitData;
    this.formSubmitted.emit(formData);
    console.log('[Form Component] Submitted Data:', formData);
  }

  public get fullNameControl() {
    return this.registrationForm.controls.fullName;
  }

  public get emailControl() {
    return this.registrationForm.controls.email;
  }

  public get phoneControl() {
    return this.registrationForm.controls.phone;
  }

  public get specializationControl() {
    return this.registrationForm.controls.specialization;
  }

  public get skillsControl(): FormArray {
    return this.registrationForm.get('skills') as FormArray;
  }

  public isInvalid(controlName: string): boolean {
    const control = this.registrationForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }
}

import { FormControl, FormArray } from '@angular/forms';
import { Specialization } from '../../../core/models/specialization.enum';

export interface RegistrationFormSchema {
  fullName: FormControl<string>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  specialization: FormControl<Specialization | null>;
  favoriteFramework: FormControl<string | null>;
  skills: FormArray<FormControl<string>>;
}

export interface RegistrationSubmitData {
  fullName: string;
  email: string | null;
  phone: string | null;
  specialization: Specialization;
  favoriteFramework: string | null;
  skills: string[];
}

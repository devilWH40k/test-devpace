// src/app/features/registration/registration-manager.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from '../registration-form/registration-form.component';
import { SuccessMessageComponent } from '../success-message/success-message.component';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-registration-manager',
  standalone: true,
  imports: [CommonModule, RegistrationFormComponent, SuccessMessageComponent],
  templateUrl: 'registration-manager.component.html',
  styleUrls: ['registration-manager.component.scss']
})
export class RegistrationManagerComponent {
  private readonly registrationService = inject(RegistrationService);

  readonly isSuccess = this.registrationService.registrationSuccess;

  onRegister(formData: any): void {
    console.log('Manager received data:', formData);
    this.registrationService.setSuccess(true);
  }

  onReset(): void {
    this.registrationService.setSuccess(false);
  }
}

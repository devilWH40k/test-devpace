import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-success-message',
  standalone: true,
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.scss']
})
export class SuccessMessageComponent {
  readonly message = input<string>('Your profile has been registered in our system.');
  readonly reset = output<void>();
}

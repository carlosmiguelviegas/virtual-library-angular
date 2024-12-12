import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { FIELD_INVALID_LENGTH, FIELD_REQUIRED, INVALID_EMAIL_ADDRESS } from '../../utils/messages';

@Component({
  selector: 'text-input',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent {

  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() type: string = 'text';

  getValidationErrors = () => {
    if (this.control.hasError("required")) {
      return FIELD_REQUIRED;
    } else if (this.control.hasError('email')) {
      return INVALID_EMAIL_ADDRESS;
    } else {
      return FIELD_INVALID_LENGTH(3);
    }
  };
  
}

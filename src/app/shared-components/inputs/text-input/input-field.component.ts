import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { FIELD_INVALID_MAX_LENGTH, FIELD_INVALID_MIN_LENGTH, FIELD_REQUIRED, INVALID_EMAIL_ADDRESS } from '../../../utils/messages';

@Component({
  selector: 'input-field',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css'
})
export class InputFieldComponent {

  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() type: string = 'text';

  getValidationErrors = () => {
    if (this.control.hasError("required")) {
      return FIELD_REQUIRED;
    } else if (this.control.hasError('email')) {
      return INVALID_EMAIL_ADDRESS;
    } else if (this.control.hasError('maxlength')) {
      return FIELD_INVALID_MAX_LENGTH(50);
    } else {
      return FIELD_INVALID_MIN_LENGTH(3);
    }
  };
  
}

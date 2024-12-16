import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { FIELD_REQUIRED } from '../../../utils/messages';

@Component({
  selector: 'select-dropdown',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './select-dropdown.component.html',
  styleUrl: './select-dropdown.component.css'
})
export class SelectDropdownComponent {

  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() list: any[] = [];

  getValidationErrors = () => this.control.hasError("required") ? FIELD_REQUIRED : "";

}

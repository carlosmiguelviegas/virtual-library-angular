import { Component, EventEmitter, Output } from '@angular/core';

import { SIGN_IN_SHOW_PASSWORD_LABEL } from '../../../utils/titles-and-labels';

@Component({
  selector: 'display-and-hide-password',
  standalone: true,
  imports: [],
  templateUrl: './display-and-hide-password.component.html',
  styleUrl: './display-and-hide-password.component.css'
})
export class DisplayAndHidePasswordComponent {

  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();
  readonly SHOW_PASSWORD_LABEL = SIGN_IN_SHOW_PASSWORD_LABEL;
  showPassword = false;

  onDisplayPassword = () => this.showPassword ? 'text' : 'password';

  onChangeDisplayPassword = () => {
    this.showPassword = !this.showPassword;
    this.onChange.emit(this.onDisplayPassword());
  };

}

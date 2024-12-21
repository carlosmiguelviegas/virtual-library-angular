import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { InputFieldComponent } from '../shared-components/inputs/text-input/input-field.component';
import { ReusableButtonComponent } from './../shared-components/buttons/reusable-button/reusable-button.component';
import { UnsubscribeSubscriptions } from '../utils/unsubscribe-subscriptions';
import { ERROR_MESSAGE_TITLE, SIGN_UP_CANCEL_LABEL, SIGN_UP_CONFIRM_PASSWORD_LABEL, SIGN_UP_EMAIL_LABEL, SIGN_UP_LABEL, SIGN_UP_NAME_LABEL, SIGN_UP_PASSWORD_LABEL, SIGN_UP_TITLE } from '../utils/titles-and-labels';
import { DisplayAndHidePasswordComponent } from '../shared-components/inputs/display-and-hide-password/display-and-hide-password.component';

@Component({
  selector: 'register',
  standalone: true,
  imports: [ ReactiveFormsModule, InputFieldComponent, ReusableButtonComponent, DisplayAndHidePasswordComponent ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm!: FormGroup;
  private unsubscribeSubs!: UnsubscribeSubscriptions;
  readonly TITLE = SIGN_UP_TITLE;
  readonly EMAIL = SIGN_UP_EMAIL_LABEL;
  readonly NAME = SIGN_UP_NAME_LABEL;
  readonly PASSWORD = SIGN_UP_PASSWORD_LABEL;
  readonly CONFIRM_PASSWORD = SIGN_UP_CONFIRM_PASSWORD_LABEL;
  readonly SIGN_UP_BUTTON_LABEL = SIGN_UP_LABEL;
  readonly CANCEL_BUTTON_LABEL = SIGN_UP_CANCEL_LABEL;
  type = 'password';

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private notificationService: NotificationService) {}
  
  ngOnInit(): void {
    this.unsubscribeSubs = new UnsubscribeSubscriptions();
    this.initRegisterForm();
  }

  private initRegisterForm = () => {
    this.registerForm = this.fb.group({
      name: [ null, [ Validators.required, Validators.min(3) ]],
      email: [ null, [ Validators.required, Validators.email ]],
      password: [ null, [ Validators.required, Validators.min(3) ]],
      passwordConfirm: [ null, [ Validators.required, Validators.min(3) ]]
    });
  }

  get formControls() {
    const formControls = {};
    return { ...formControls, 
              name: this.registerForm.get('name') as FormControl,
              email: this.registerForm.get('email') as FormControl,
              password: this.registerForm.get('password') as FormControl,
              passwordConfirm: this.registerForm.get('passwordConfirm') as FormControl
           };
  }

  onRegisterNewUser = () => {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.unsubscribeSubs.add = this.auth.registerNewUser(this.registerForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res['headers'].get('token'));
        this.router.navigateByUrl("/home");
      },
      err => this.notificationService.setMessage(ERROR_MESSAGE_TITLE, err['error']['errors'][0]['message'])
    );
  }

  onReset = () => {
    this.registerForm.reset();
  }

  togglePassword = (event: string) => this.type = event;

  ngOnDestroy(): void {
    this.unsubscribeSubs.unsubscribeAll();
  }

}

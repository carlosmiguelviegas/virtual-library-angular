import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { InputFieldComponent } from '../shared-components/inputs/text-input/input-field.component';
import { ReusableButtonComponent } from './../shared-components/buttons/reusable-button/reusable-button.component';
import { ERROR_MESSAGE_TITLE, SIGN_IN_EMAIL_LABEL, SIGN_IN_LABEL, SIGN_IN_PASSWORD_LABEL, SIGN_IN_TITLE } from '../utils/titles-and-labels';
import { NotificationService } from '../services/notification.service';
import { UnsubscribeSubscriptions } from '../utils/unsubscribe-subscriptions';
import { DisplayAndHidePasswordComponent } from '../shared-components/inputs/display-and-hide-password/display-and-hide-password.component';

@Component({
  selector: 'login',
  standalone: true,
  imports: [ ReactiveFormsModule, InputFieldComponent, ReusableButtonComponent, DisplayAndHidePasswordComponent ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  private unsubscribeSubs!: UnsubscribeSubscriptions;
  readonly TITLE = SIGN_IN_TITLE;
  readonly EMAIL_LABEL = SIGN_IN_EMAIL_LABEL;
  readonly PASSWORD_LABEL = SIGN_IN_PASSWORD_LABEL;
  readonly BUTTON_LABEL = SIGN_IN_LABEL;
  type = 'password';

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private notificationService: NotificationService) {}
  
  ngOnInit(): void {
    this.unsubscribeSubs = new UnsubscribeSubscriptions();
    this.initLoginForm();
  }

  private initLoginForm = () => {
    this.loginForm = this.fb.group({
      email: [ null, [ Validators.required, Validators.email ]],
      password: [ null, [ Validators.required, Validators.min(3) ]]
    });
  }

  get formControls() {
    const formControls = {};
    return { ...formControls, 
              email: this.loginForm.get('email') as FormControl,
              password: this.loginForm.get('password') as FormControl
           };
  }

  onLogIn = () => {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.unsubscribeSubs.add = this.auth.login(this.loginForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res['headers'].get('token'));
        this.router.navigateByUrl("/home");
      },
      err => this.notificationService.setMessage(ERROR_MESSAGE_TITLE, err['error']['errors'][0]['message'])
    );
  }

  togglePassword = (event: any) => {
    console.log(event);
    /* this.type = this.showPassword ? 'text' : 'password'; */
  };

  ngOnDestroy(): void {
    this.unsubscribeSubs.unsubscribeAll();
  }

}

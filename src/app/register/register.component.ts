import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { InputFieldComponent } from '../shared-components/inputs/text-input/input-field.component';
import { ReusableButtonComponent } from './../shared-components/buttons/reusable-button/reusable-button.component';
import { ERROR_MESSAGE_TITLE, SIGN_UP_CANCEL_LABEL, SIGN_UP_LABEL, SIGN_UP_TITLE } from '../utils/titles-and-labels';
import { NotificationService } from '../services/notification.service';
import { UnsubscribeSubscriptions } from '../utils/unsubscribe-subscriptions';

@Component({
  selector: 'register',
  standalone: true,
  imports: [ ReactiveFormsModule, InputFieldComponent, ReusableButtonComponent ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm!: FormGroup;
  private unsubscribeSubs!: UnsubscribeSubscriptions;
  readonly TITLE: string = SIGN_UP_TITLE;
  readonly LABEL: string = SIGN_UP_LABEL;
  readonly CANCEL_LABEL: string = SIGN_UP_CANCEL_LABEL;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private notificationService: NotificationService) {}
  
  ngOnInit(): void {
    this.unsubscribeSubs = new UnsubscribeSubscriptions();
    this.initRegisterForm();
  }

  private initRegisterForm = () => {
    this.registerForm = this.fb.group({
      email: [ null, [ Validators.required, Validators.email ]],
      name: [ null, [ Validators.required, Validators.min(3) ]],
      password: [ null, [ Validators.required, Validators.min(3) ]],
      passwordConfirm: [ null, [ Validators.required, Validators.min(3) ]]
    });
  }

  get formControls() {
    const formControls = {};
    return { ...formControls, 
              email: this.registerForm.get('email') as FormControl,
              name: this.registerForm.get('name') as FormControl,
              password: this.registerForm.get('password') as FormControl,
              passwordConfirm: this.registerForm.get('passwordConfirm') as FormControl
           };
  }

  onLogIn = () => {
    // it was intentional
  }

  ngOnDestroy(): void {
    this.unsubscribeSubs.unsubscribeAll();
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoginRequest } from '../models/LoginRequest.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://localhost:8000/api/v1/users/';
  private LOGIN_URL = `${this.BASE_URL}` + 'login';

  private loggedInUserSubject: BehaviorSubject<string>;

  constructor(private http: HttpClient) {
    this.loggedInUserSubject = new BehaviorSubject<string>('');
  }

  loggedInUserValue = () => this.loggedInUserSubject.asObservable();

  login = (login: LoginRequest) => {
    return this.http.post(`${this.LOGIN_URL}`, login, { observe: 'response' });
  }

}

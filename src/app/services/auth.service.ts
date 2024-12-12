import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoginRequest } from '../models/LoginRequest.model';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://localhost:8080/';
  private LOGIN_URL = `${this.BASE_URL}` + 'api/auth/signin';

  private loggedInUserSubject: BehaviorSubject<string>;

  constructor(private http: HttpClient) {
    this.loggedInUserSubject = new BehaviorSubject<string>('');
  }

  loggedInUserValue = () => this.loggedInUserSubject.asObservable();

  login = (login: LoginRequest) => {
    return this.http.post(`${this.LOGIN_URL}`, login).pipe(
      map((user) => this.loggedInUserSubject.next(JSON.stringify(user)))
    );
  }

}

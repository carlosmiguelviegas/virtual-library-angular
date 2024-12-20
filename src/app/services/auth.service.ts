import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { LoginRequest } from '../models/LoginRequest.model';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/User.model';
import { RegisterNewUserRequest } from '../models/RegisterNewUserRequest.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://localhost:8000/api/v1/users/';
  private LOGIN_URL = `${this.BASE_URL}` + 'login';
  private SIGN_UP_URL = `${this.BASE_URL}` + 'signup';

  private loggedInUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.loggedInUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
  }

  loggedInUserValue = () => this.loggedInUserSubject.asObservable();

  login = (login: LoginRequest) => {
    return this.http.post(`${this.LOGIN_URL}`, login, { observe: 'response' }).pipe(
      map((user) => {
        const loggedInUser: User = user['body'] as User;
        localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
        this.loggedInUserSubject.next(loggedInUser);
        return user;
      })
    );
  }

  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.loggedInUserSubject.next({} as User);
    this.router.navigateByUrl('/login');
  }

  registerNewUser = (request: RegisterNewUserRequest) => {
    return this.http.post(`${this.SIGN_UP_URL}`, request, { observe: 'response' }).pipe(
      map((user) => {
        const loggedInUser: User = user['body'] as User;
        localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
        this.loggedInUserSubject.next(loggedInUser);
        return user;
      })
    );
  }

}

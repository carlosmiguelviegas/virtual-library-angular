import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/User.model';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private BASE_URL = 'http://localhost:8000/api/v1/';
  private GET_USERS_URL = `${this.BASE_URL}` + 'users';
  private DISABLE_USER_URL = `${this.BASE_URL}` + '/users/disable/';
  
  constructor(private http: HttpClient) {}

  getUsers = () => {
    return this.http.get<Observable<User[]>>(this.GET_USERS_URL).pipe(
      catchError(err => err.error)
    );
  };

  disableUser = (userId: number) => {
    return this.http.patch<Observable<any>>(`${this.DISABLE_USER_URL}${userId}`, null);
  };

}

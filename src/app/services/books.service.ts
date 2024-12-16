import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { CreateBookRequest } from '../models/CreateBookRequest.model';
import { Book } from './../models/Book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private BASE_URL = 'http://localhost:8000/api/v1/books';
  private CREATE_BOOK_URL = `${this.BASE_URL}` + '/create';

  constructor(public http: HttpClient) {}

  createBook = (request: CreateBookRequest) => this.http.post<Observable<Book>>(this.CREATE_BOOK_URL, request);

}

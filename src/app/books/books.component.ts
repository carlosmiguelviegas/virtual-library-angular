import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { CreateBookDialogComponent } from '../shared-components/dialogs/create-book-dialog/create-book-dialog.component';
import { ReusableButtonComponent } from '../shared-components/buttons/reusable-button/reusable-button.component';
import { BOOKS_PAGE_CREATE_LABEL, BOOKS_PAGE_TITLE, ERROR_MESSAGE_TITLE, SUCCESS_MESSAGE_TITLE } from '../utils/titles-and-labels';
import { CreateBookRequest } from '../models/CreateBookRequest.model';
import { BooksService } from '../services/books.service';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';
import { UnsubscribeSubscriptions } from '../utils/unsubscribe-subscriptions';

@Component({
  selector: 'books',
  standalone: true,
  imports: [ CommonModule, ReusableButtonComponent ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit, OnDestroy {

  dialog = inject(MatDialog);
  booksService = inject(BooksService);
  notificationService = inject(NotificationService);
  authService = inject(AuthService);

  private unsubscribeSubs!: UnsubscribeSubscriptions;
  TITLE = BOOKS_PAGE_TITLE;
  LABEL_CREATE_BOOK = BOOKS_PAGE_CREATE_LABEL;
  hideCreateButton = false;

  ngOnInit(): void {
    this.unsubscribeSubs = new UnsubscribeSubscriptions();
    this.checkValidities();
  }

  onOpenAddBookDialog = (_event: any) => {
    const dialogRef = this.dialog.open(CreateBookDialogComponent);
    this.unsubscribeSubs.add = dialogRef.afterClosed().subscribe(
      res => {
        if (!res || 'ok' === res) {
          return;
        }
        this.onAddBook(res);
    });
  };

  private onAddBook = (newBook: CreateBookRequest) => { 
    this.unsubscribeSubs.add = this.booksService.createBook(newBook).subscribe(
      (res: any) => this.notificationService.setMessage(SUCCESS_MESSAGE_TITLE, res['message']),
      err => this.notificationService.setMessage(ERROR_MESSAGE_TITLE, err['error']['message'])
    );
  };

  private checkValidities() {
    this.unsubscribeSubs.add = this.authService.loggedInUserValue().subscribe(
      user => this.hideCreateButton = 'admin' === user['role'] ? false : true
    );
  };

  ngOnDestroy(): void {
    this.unsubscribeSubs.unsubscribeAll();
  }

}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { CreateBookDialogComponent } from '../shared-components/dialogs/create-book-dialog/create-book-dialog.component';
import { ReusableButtonComponent } from '../shared-components/buttons/reusable-button/reusable-button.component';
import { BOOKS_PAGE_CREATE_LABEL, BOOKS_PAGE_TITLE } from '../utils/titles-and-labels';

@Component({
  selector: 'books',
  standalone: true,
  imports: [ CommonModule, ReusableButtonComponent ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {

  dialog = inject(MatDialog);

  TITLE = BOOKS_PAGE_TITLE;
  LABEL_CREATE_BOOK = BOOKS_PAGE_CREATE_LABEL;

  ngOnInit(): void {
    // it was intentional
  }

  onOpenAddBookDialog = (_event: any) => {
    const dialogRef = this.dialog.open(CreateBookDialogComponent);
  };

}

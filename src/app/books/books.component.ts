import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'books',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {

  ngOnInit(): void {
    // it was intentional
  }

}

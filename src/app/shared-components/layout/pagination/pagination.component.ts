import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { PageEvent } from './page-event.model';

@Component({
  selector: 'pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit {

  @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  ngOnInit(): void {
    // it was intentional
  }

}

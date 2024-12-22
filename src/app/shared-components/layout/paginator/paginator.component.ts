import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { PageEvent } from './page-event.model';

@Component({
  selector: 'paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnInit {

  @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  ngOnInit(): void {
    // it was intentional
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PageEvent } from './page-event.model';

@Component({
  selector: 'paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnInit {

  @Input() totalElements!: number;
  @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  event!: PageEvent;
  currentPageIndex = 0;
  currentPageSize = 5;

  ngOnInit(): void {
    this.event = new PageEvent(this.currentPageIndex, this.currentPageSize);
  }

  nextPage = () => {
    this.event = { ...this.event,
                    pageIndex: this.event['pageIndex'] + 1 };
    this.pageEvent.emit(this.event);
  };

  previousPage = () => {
    this.event = { ...this.event,
                   pageIndex: this.event['pageIndex'] - 1 };
    this.pageEvent.emit(this.event);
  };

  changePageSize = (event: any) => {
    this.event = { ...this.event,
                    pageSize: event };
    this.pageEvent.emit(this.event);
  };

}

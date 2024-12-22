import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PageEvent } from './page-event.model';
import { MatIcon } from '@angular/material/icon';
import { PAGINATOR_ITEMS_PAGE, PAGINATOR_PAGE_NUMBER } from '../../../utils/titles-and-labels';

@Component({
  selector: 'paginator',
  standalone: true,
  imports: [ MatIcon ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnInit {

  @Input() totalElements!: number;
  @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  event!: PageEvent;
  currentPageIndex = 0;
  currentPageSize = 4;
  ITEMS_PAGE_LABEL = PAGINATOR_ITEMS_PAGE;
  PAGE_NUMBER_LABEL!: string;

  ngOnInit(): void {
    this.event = new PageEvent(this.currentPageIndex, this.currentPageSize);
  }

  nextPage = () => {
    this.event = { ...this.event,
                    pageIndex: this.event['pageIndex'] + 1 };
    this.PAGE_NUMBER_LABEL = PAGINATOR_PAGE_NUMBER(this.event['pageIndex'] + 1, Math.ceil(this.totalElements / this.event['pageSize']));
    this.pageEvent.emit(this.event);
  };

  previousPage = () => {
    this.event = { ...this.event,
                   pageIndex: this.event['pageIndex'] - 1 };
    this.PAGE_NUMBER_LABEL = PAGINATOR_PAGE_NUMBER(this.event['pageIndex'] + 1, Math.ceil(this.totalElements / this.event['pageSize']));
    this.pageEvent.emit(this.event);
  };

  changePageSize = (event: any) => {
    this.event = { ...this.event,
                    pageSize: Number(event['target']['value']) };
    this.pageEvent.emit(this.event);
  };

}

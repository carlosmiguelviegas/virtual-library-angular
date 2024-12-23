import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageEvent } from './page-event.model';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { PAGINATOR_ITEMS_PAGE, PAGINATOR_NEXT_PAGE, PAGINATOR_PAGE_NUMBER, PAGINATOR_PREVIOUS_PAGE } from '../../../utils/titles-and-labels';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'paginator',
  standalone: true,
  imports: [ CommonModule, MatIconModule, MatIcon, MatTooltipModule  ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnInit {

  @Input() totalElements!: number;
  @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  event!: PageEvent;
  currentPageIndex = 1;
  currentPageSize = 4;
  ITEMS_PAGE_LABEL = PAGINATOR_ITEMS_PAGE;
  PAGE_NUMBER_LABEL!: string;
  nextPageTooltip = PAGINATOR_NEXT_PAGE;
  previousPageTooltip = PAGINATOR_PREVIOUS_PAGE;

  ngOnInit(): void {
    this.event = new PageEvent(this.currentPageIndex, this.currentPageSize);
    this.PAGE_NUMBER_LABEL = PAGINATOR_PAGE_NUMBER(this.event['pageIndex'], Math.ceil(this.totalElements / this.event['pageSize']));
    this.pageEvent.emit(this.event);
  }

  nextPage = () => {
    this.event = { ...this.event,
                    pageIndex: this.event['pageIndex'] + 1 };
    this.PAGE_NUMBER_LABEL = PAGINATOR_PAGE_NUMBER(this.event['pageIndex'], Math.ceil(this.totalElements / this.event['pageSize']));
    this.pageEvent.emit(this.event);
  };

  previousPage = () => {
    this.event = { ...this.event,
                   pageIndex: this.event['pageIndex'] - 1 };
    this.PAGE_NUMBER_LABEL = PAGINATOR_PAGE_NUMBER(this.event['pageIndex'], Math.ceil(this.totalElements / this.event['pageSize']));
    this.pageEvent.emit(this.event);
  };

  changePageSize = (event: any) => {
    this.event = { ...this.event,
                    pageSize: Number(event['target']['value']) };
    this.pageEvent.emit(this.event);
  };

}

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersService } from '../services/users.service';
import { UserCardComponent } from '../shared-components/cards/user-card/user-card.component';
import { ERROR_MESSAGE_TITLE, SUCCESS_MESSAGE_TITLE, USERS_PAGE_EMPTY_LIST_MESSAGE, USERS_PAGE_TITLE } from '../utils/titles-and-labels';
import { User } from '../models/User.model';
import { NotificationService } from '../services/notification.service';
import { UnsubscribeSubscriptions } from '../utils/unsubscribe-subscriptions';
import { PaginatorComponent } from '../shared-components/layout/paginator/paginator.component';

@Component({
  selector: 'users',
  standalone: true,
  imports: [ CommonModule, UserCardComponent, PaginatorComponent ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, OnDestroy {

  usersService = inject(UsersService);
  notificationService = inject(NotificationService);

  private unsubscribeSubs!: UnsubscribeSubscriptions;
  users!: any;
  totalElements!: number;
  title = USERS_PAGE_TITLE;
  emptyListMessage = USERS_PAGE_EMPTY_LIST_MESSAGE;

  ngOnInit(): void {
    this.unsubscribeSubs = new UnsubscribeSubscriptions();
    this.onGetAllActiveUsers();
  }

  onGetAllActiveUser = (event: any) => {
    console.log('Pagination: ',event);
  };

  onGetAllActiveUsers = () => {
    this.unsubscribeSubs.add = this.usersService.getUsers().subscribe(
      (users: any) => {
        this.users = users['usersList'];
        this.totalElements = users['total'];
      }
    );
  };

  onDisableUser = (userId: string) => {
    this.unsubscribeSubs.add = this.usersService.disableUser(userId).subscribe(
      (res: any) => {
        this.users = this.users.filter((user: User) => user['_id'] !== userId);
        this.notificationService.setMessage(SUCCESS_MESSAGE_TITLE, res['message']);
      },
      err => this.notificationService.setMessage(ERROR_MESSAGE_TITLE, err['error']['errors'][0]['message'])
    );
  };

  ngOnDestroy(): void {
    this.unsubscribeSubs.unsubscribeAll();
  }

}

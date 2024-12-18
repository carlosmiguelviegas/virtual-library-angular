import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersService } from '../services/users.service';
import { UserCardComponent } from '../shared-components/cards/user-card/user-card.component';
import { ERROR_MESSAGE_TITLE, SUCCESS_MESSAGE_TITLE, USERS_PAGE_EMPTY_LIST_MESSAGE, USERS_PAGE_TITLE } from '../utils/titles-and-labels';
import { User } from '../models/User.model';
import { NotificationService } from '../services/notification.service';
import { UnsubscribeSubscriptions } from '../utils/unsubscribe-subscriptions';

@Component({
  selector: 'users',
  standalone: true,
  imports: [ CommonModule, UserCardComponent ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, OnDestroy {

  usersService = inject(UsersService);
  notificationService = inject(NotificationService);

  private unsubscribeSubs!: UnsubscribeSubscriptions;
  users!: any;
  title = USERS_PAGE_TITLE;
  emptyListMessage = USERS_PAGE_EMPTY_LIST_MESSAGE;

  ngOnInit(): void {
    this.unsubscribeSubs = new UnsubscribeSubscriptions();
    this.onGetAllActiveUsers();
  }

  onGetAllActiveUsers = () => {
    this.unsubscribeSubs.add = this.usersService.getUsers().subscribe(
      users => this.users = users
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

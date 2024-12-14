import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersService } from '../services/users.service';
import { UserCardComponent } from '../shared-components/cards/user-card/user-card.component';
import { USERS_PAGE_EMPTY_LIST_MESSAGE, USERS_PAGE_TITLE } from '../utils/titles-and-labels';
import { User } from '../models/User.model';

@Component({
  selector: 'users',
  standalone: true,
  imports: [ CommonModule, UserCardComponent ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  usersService = inject(UsersService);

  users!: any;
  title = USERS_PAGE_TITLE;
  emptyListMessage = USERS_PAGE_EMPTY_LIST_MESSAGE;

  ngOnInit(): void {
    this.onGetAllActiveUsers();
  }

  onGetAllActiveUsers = () => {
    this.usersService.getUsers().subscribe(
      users => this.users = users
    );
  };

  onDisableUser = (userId: string) => {
    this.usersService.disableUser(userId).subscribe(
      () => this.users = this.users.filter((user: User) => user['_id'] !== userId)
    );
  };

}

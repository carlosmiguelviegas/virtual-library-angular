import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersService } from '../services/users.service';

@Component({
  selector: 'users',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  usersService = inject(UsersService);

  users!: any;

  ngOnInit(): void {
    this.onGetAllActiveUsers();
  }

  onGetAllActiveUsers = () => {
    this.usersService.getUsers().subscribe(
      users => this.users = users
    );
  };

}

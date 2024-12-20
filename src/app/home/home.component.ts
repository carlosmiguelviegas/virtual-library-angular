import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { UnsubscribeSubscriptions } from '../utils/unsubscribe-subscriptions';
import { User } from '../models/User.model';
import { HOME_PAGE_WELCOME } from '../utils/titles-and-labels';

@Component({
  selector: 'home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  auth = inject(AuthService);

  private unsubscribeSubs!: UnsubscribeSubscriptions;
  title!: string;
  userLoggedIn!: User;

  ngOnInit(): void {
    this.unsubscribeSubs = new UnsubscribeSubscriptions();
    this.getCurrentUser();
  }

  getCurrentUser = () => {
    this.unsubscribeSubs.add = this.auth.loggedInUserValue().subscribe(
      currentUser => {
        this.userLoggedIn = currentUser;
        this.title = `${HOME_PAGE_WELCOME} ${this.userLoggedIn['name']}`;
      }
    );
  };

  ngOnDestroy(): void {
    this.unsubscribeSubs.unsubscribeAll();
  }

}

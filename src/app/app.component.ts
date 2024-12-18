import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavigationBarComponent } from './shared-components/layout/navigation-bar/navigation-bar.component';
import { AuthService } from './services/auth.service';
import { User } from './models/User.model';
import { BOOKS_LINK, HOME_LINK, USERS_LINK } from './utils/titles-and-labels';
import { UnsubscribeSubscriptions } from './utils/unsubscribe-subscriptions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  
  auth = inject(AuthService);

  title = 'virtual-library-angular';
  private unsubscribeSubs!: UnsubscribeSubscriptions;
  isLoggedIn!: boolean;
  list!: string[];

  ngOnInit(): void {
    this.unsubscribeSubs = new UnsubscribeSubscriptions();
    this.checkLogin();
  }

  checkLogin = () => {
    this.unsubscribeSubs.add = this.auth.loggedInUserValue().subscribe(
      (currentUser: User) => {
        this.isLoggedIn = currentUser?.role ? true : false;
        if ('admin' === currentUser?.role) {
          this.list = [ HOME_LINK, BOOKS_LINK, USERS_LINK ];
        } else {
          this.list = [ HOME_LINK, BOOKS_LINK, USERS_LINK ].slice(0, 2);
        }
      }
    );
  };

  onLogOut = () => this.auth.logout();

  ngOnDestroy(): void {
    this.unsubscribeSubs.unsubscribeAll();
  }

}

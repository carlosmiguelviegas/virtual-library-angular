import { inject } from '@angular/core';
import { CanActivateFn, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { User } from './models/User.model';

export const adminGuard: CanActivateFn = () => {
  
  const auth = inject(AuthService);
  let userIn!: User;
  
  auth.loggedInUserValue().subscribe(
    user => userIn = JSON.parse(user)
  );
  if (userIn && 'admin' === userIn['role']) {
    return true;
  }
  return false;
};

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'books', loadChildren: () => import('./books/books.module').then(m => m.BooksModule) },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

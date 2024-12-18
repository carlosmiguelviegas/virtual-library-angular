import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: 'home', canActivate: [authGuard], component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'users', canActivate: [authGuard, adminGuard], loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'books', canActivate: [authGuard], loadChildren: () => import('./books/books.module').then(m => m.BooksModule) },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from './../services/auth.service';
import { User } from './../models/User.model';

export const adminGuard: CanActivateFn = () => {
  
  const auth = inject(AuthService);
  const router = inject(Router);
  let currentUser!: User;

  auth.loggedInUserValue().subscribe(
    user => currentUser = user
  );
  if (currentUser && 'admin' === currentUser['role']) {
    return true;
  }
  router.navigateByUrl("/home");
  return false;
};
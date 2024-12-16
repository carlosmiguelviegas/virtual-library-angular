import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from './../services/auth.service';
import { User } from './../models/User.model';

export const authGuard: CanActivateFn = () => {
  
  const auth = inject(AuthService);
  const router = inject(Router);
  let currentUser!: User;

  auth.loggedInUserValue().subscribe(
    user => currentUser = user
  );
  if (currentUser) {
    return true;
  }
  router.navigateByUrl("/login");
  return false;
};
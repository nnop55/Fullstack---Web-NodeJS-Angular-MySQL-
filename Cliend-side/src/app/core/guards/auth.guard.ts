import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('signing', authService.isAuthenticatedUser())
  if (!authService.isAuthenticatedUser()) {
    router.navigate(['/auth/signin']);
    return false;
  }
  return true;
};

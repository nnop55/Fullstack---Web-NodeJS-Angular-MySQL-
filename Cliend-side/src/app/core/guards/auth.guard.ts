import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const ls = inject(LocalStorageService)

  const not = () => {
    router.navigate(['/auth/signin']);
    return false
  }

  authService.unauthorized$.subscribe(() => {
    ls.remove('currentUser')
    not()
  });

  if (!authService.getBearerToken()) {
    not()
  }
  return true;
};



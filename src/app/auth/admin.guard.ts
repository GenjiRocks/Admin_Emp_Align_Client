import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const adminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService)
  const role = authService.getRole();

  if(route.routeConfig?.path === 'admin' && role !== 'Admin'){
    router.navigate(['/profile'])
    return false;

  }
  
  return true;
};

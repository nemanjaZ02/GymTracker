import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../feature-modules/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const isLoggedIn = this.authService.user$.value.id !== 0;

    if (route.data['requiresAuth'] && !isLoggedIn) {
      this.router.navigate(['/home']);
      return false;
    }

		if (route.data['guestOnly'] && isLoggedIn) {
      this.router.navigate(['/home']);
      return false;
    }

    return true; 
  }
}

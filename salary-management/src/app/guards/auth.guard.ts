import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const requiresAuth = route.data['requiresAuth'] as boolean;
    const isLoggedIn = this.authService.isLoggedIn();

    if (requiresAuth && !isLoggedIn) {
      // Если требуется авторизация, но пользователь не авторизован
      return this.router.createUrlTree(['/login'], { 
        queryParams: { returnUrl: state.url } 
      });
    } else if (!requiresAuth && isLoggedIn) {
      // Если пользователь авторизован, но пытается попасть на страницу входа
      return this.router.createUrlTree(['/dashboard']);
    }

    // Для публичных страниц (как login) - разрешаем доступ, если не авторизован
    // Для защищенных страниц - разрешаем доступ, если авторизован
    return !requiresAuth || isLoggedIn;
  }
}

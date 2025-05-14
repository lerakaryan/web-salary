import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private authTokenKey = 'auth_token';

  constructor(private router: Router) {
    // При инициализации сбрасываем состояние аутентификации
    this.isAuthenticated = false;
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem('currentUser');
  }

  login(username: string, password: string): boolean {
    // Здесь должна быть реальная проверка логина/пароля
    // Пока что просто сохраняем любой ввод
    if (username && password) {
      this.isAuthenticated = true;
      localStorage.setItem(this.authTokenKey, 'dummy_token');
      localStorage.setItem('currentUser', JSON.stringify({ username }));
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.authTokenKey);
    const user = localStorage.getItem('currentUser');
    return this.isAuthenticated && !!token && !!user;
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}

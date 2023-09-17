import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;
  constructor(private router: Router) {}

  login(username: string, password: string): string | null {
    // Simulate a login by checking username and password
    if (username === 'user' && password === 'user') {
      this.loggedIn = true;
      return this.generateToken('user');
    } else if (username === 'admin' && password === 'admin') {
      this.loggedIn = true;
      return this.generateToken('admin');
    }
    return null;
  }

  private generateToken(role: string): string {
    localStorage.setItem('token', role);

    return role;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') != null;
  }

  isUserLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token != null;
  }
  getUserRole() {
    const token = localStorage.getItem('token');
    return token;
  }
}

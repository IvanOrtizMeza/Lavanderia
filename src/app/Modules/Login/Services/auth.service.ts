import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '../Interfaces/login.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);

  async login(credentials: LoginRequest): Promise<void> {
    // TODO: replace with real HTTP call, e.g. this.http.post('/api/auth/login', credentials)
    console.log('Login credentials:', credentials);
    await this.router.navigate(['/dashboard']);
  }
}

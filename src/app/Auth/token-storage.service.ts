import { computed, Injectable, signal } from '@angular/core';
import { User } from './user.interface';

const TOKEN_KEY = 'auth_token';
const USER_KEY  = 'auth_user';

/**
 * Responsabilidad única: persistir y exponer el token JWT y los datos
 * básicos del usuario autenticado. Fuente de verdad reactiva para toda la app.
 */
@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  private readonly _token = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  private readonly _user  = signal<User | null>(
    JSON.parse(localStorage.getItem(USER_KEY) ?? 'null'),
  );

  /** `true` si hay un token almacenado */
  readonly isAuthenticated = computed(() => !!this._token());

  /** Datos del usuario actualmente autenticado */
  readonly currentUser = this._user.asReadonly();

  getToken(): string | null {
    return this._token();
  }

  saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    this._token.set(token);
  }

  saveUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this._user.set(user);
  }

  clear(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._token.set(null);
    this._user.set(null);
  }
}

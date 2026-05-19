import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, finalize, catchError, EMPTY } from 'rxjs';
import { LoginRequest, LoginResponse } from '../Interfaces/login.interface';
import { TokenStorageService } from '../../../Auth/token-storage.service';
import { environment } from '../../../enviroment/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly tokenStorage = inject(TokenStorageService);

  /** Reactivo: `true` si el usuario está autenticado */
  readonly isAuthenticated = this.tokenStorage.isAuthenticated;

  /** Datos del usuario actualmente autenticado */
  readonly currentUser = this.tokenStorage.currentUser;

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(({ data }) => {
          this.tokenStorage.saveToken(data.access_token);
          this.tokenStorage.saveUser(data.user);
        }),
      );
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${environment.apiUrl}/auth/logout`, {})
      .pipe(
        catchError(() => EMPTY),
        finalize(() => {
          this.tokenStorage.clear();
          this.router.navigate(['/login']);
        }),
      );
  }
}

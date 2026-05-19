import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { email, form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY, catchError, firstValueFrom } from 'rxjs';
import { LoginRequest } from './Interfaces/login.interface';
import { AuthService } from './Services/auth.service';
import { TokenStorageService } from '../../../app/Auth/token-storage.service';
// ── Particle config (static, computed once) ────────────────────────────────────
const PARTICLES = Array.from({ length: 35 }, () => ({
  size: Math.random() * 10 + 4,
  left: Math.random() * 100,
  delay: Math.random() * 14,
  duration: Math.random() * 12 + 8,
}));

// ──────────────────────────────────────────────────────────────────────────────
@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, FormField, FormRoot],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly isAuthenticated = inject(TokenStorageService);

  // ── UI state ────────────────────────────────────────────────────────────────
  readonly hide = signal(true);
  readonly shaking = signal(false);
  readonly serverError = signal<string | null>(null);
  readonly particles = PARTICLES;

  // ── Form ────────────────────────────────────────────────────────────────────
  private readonly model = signal<LoginRequest>({ email: '', password: '' });

  readonly loginForm = form(
    this.model,
    (login) => {
      required(login.email, { message: 'El correo es requerido' });
      email(login.email, { message: 'Ingresa un correo válido' });
      required(login.password, { message: 'La contraseña es requerida' });
      minLength(login.password, 8, { message: 'Mínimo 8 caracteres' });
    },
    {
      submission: {
        action: async () => {
          this.serverError.set(null);
          await firstValueFrom(
            this.auth.login(this.model()).pipe(
              catchError((err: HttpErrorResponse) => {
                const msg = err.error?.message ?? 'Credenciales incorrectas. Intenta de nuevo.';
                this.serverError.set(msg);
                return EMPTY;
              })));
          if (!this.serverError()) {
            this.router.navigate(['/dashboard']);
          }
        },
        onInvalid: () => {
          //this.shaking.set(true);
          //setTimeout(() => this.shaking.set(false), 600);
        },
      },
    },
  );

}

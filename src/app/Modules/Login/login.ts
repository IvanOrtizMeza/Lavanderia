import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { email, form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { LoginRequest } from './Interfaces/login.interface';
import { AuthService } from './Services/auth.service';

// ── Particle config (static, computed once) ────────────────────────────────────
const PARTICLES = Array.from({ length: 35 }, () => ({
  size: Math.random() * 10 + 4,
  left: Math.random() * 100,
  delay: Math.random() * 14,
  duration: Math.random() * 12 + 8,
}));

const STRENGTH_WIDTHS = ['0%', '20%', '40%', '65%', '82%', '100%'] as const;
const STRENGTH_CLASSES = ['', 'weak', 'weak', 'medium', 'strong', 'very-strong'] as const;
const STRENGTH_LABELS = ['', 'Muy débil', 'Débil', 'Regular', 'Fuerte', 'Muy fuerte'] as const;

// ──────────────────────────────────────────────────────────────────────────────
@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, FormField, FormRoot],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private auth = inject(AuthService);

  // ── UI state ────────────────────────────────────────────────────────────────
  readonly hide = signal(true);
  readonly shaking = signal(false);
  readonly particles = PARTICLES;

  // ── Form ────────────────────────────────────────────────────────────────────
  private readonly model = signal<LoginRequest>({ email: '', password: '' });

  readonly loginForm = form(
    this.model,
    (login) => {
      required(login.email, { message: 'El correo es requerido' });
      email(login.email, { message: 'Ingresa un correo válido' });
      required(login.password, { message: 'La contraseña es requerida' });
      minLength(login.password, 6, { message: 'Mínimo 6 caracteres' });
    },
    {
      submission: {
        //cuando el formulario es valido 
        action: () => this.auth.login(this.model()),
        //cuando no paso las validaciones
        onInvalid: () => {
          this.shaking.set(true);
          setTimeout(() => this.shaking.set(false), 600);
        },
      },
    },
  );

  // ── Password strength ───────────────────────────────────────────────────────
  readonly passwordValue = computed(() => this.loginForm.password().value() ?? '');

  readonly strengthScore = computed(() => {
    const p = this.passwordValue();
    return [p.length >= 6, p.length >= 10, /[A-Z]/.test(p), /[0-9]/.test(p), /[^A-Za-z0-9]/.test(p)].filter(Boolean).length;
  });

  readonly strengthWidth = computed(() => STRENGTH_WIDTHS[this.strengthScore()]);
  readonly strengthClass = computed(() => STRENGTH_CLASSES[this.strengthScore()]);
  readonly strengthLabel = computed(() => (this.passwordValue().length > 0 ? STRENGTH_LABELS[this.strengthScore()] : ''));
}

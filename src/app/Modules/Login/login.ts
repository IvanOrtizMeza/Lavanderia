import { Component, computed, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  hide    = signal(true);
  loading = signal(false);
  shaking = signal(false);

  particles = Array.from({ length: 35 }, () => ({
    size:     Math.random() * 10 + 4,
    left:     Math.random() * 100,
    delay:    Math.random() * 14,
    duration: Math.random() * 12 + 8,
  }));

  private fb    = inject(FormBuilder);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  passwordValue = computed(() => this.form.controls.password.value ?? '');

  strengthScore = computed(() => {
    const p = this.passwordValue();
    let s = 0;
    if (p.length >= 6)           s++;
    if (p.length >= 10)          s++;
    if (/[A-Z]/.test(p))         s++;
    if (/[0-9]/.test(p))         s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  });

  strengthWidth = computed(() =>
    ['0%', '20%', '40%', '65%', '82%', '100%'][this.strengthScore()]
  );
  strengthClass = computed(() =>
    ['', 'weak', 'weak', 'medium', 'strong', 'very-strong'][this.strengthScore()]
  );
  strengthLabel = computed(() => {
    const l = ['', 'Muy débil', 'Débil', 'Regular', 'Fuerte', 'Muy fuerte'];
    return this.passwordValue().length > 0 ? l[this.strengthScore()] : '';
  });

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.shaking.set(true);
      setTimeout(() => this.shaking.set(false), 600);
      return;
    }
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
      this.router.navigate(['/dashboard']);
    }, 2000);
  }
}

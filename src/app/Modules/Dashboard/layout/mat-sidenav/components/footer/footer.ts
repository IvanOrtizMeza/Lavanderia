import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../../../../Login/Services/auth.service';

@Component({
  selector: 'app-footer',
  imports: [MatIconModule, MatProgressSpinnerModule, MatTooltipModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  private readonly auth = inject(AuthService);

  readonly user        = this.auth.currentUser;
  readonly loggingOut  = signal(false);

  /** Primera letra del nombre para el avatar */
  readonly initial = computed(() => {
    const name = this.user()?.name ?? '';
    return name.charAt(0).toUpperCase() || '?';
  });

  /** Nombre truncado para el sidebar */
  readonly displayName = computed(() => this.user()?.name ?? 'Usuario');

  /** Email o rol como subtítulo */
  readonly displaySub = computed(() => this.user()?.email ?? '');

  onLogout(): void {
    if (this.loggingOut()) return;
    this.loggingOut.set(true);
    this.auth.logout().subscribe({
      complete: () => this.loggingOut.set(false),
      error:    () => this.loggingOut.set(false),
    });
  }
}

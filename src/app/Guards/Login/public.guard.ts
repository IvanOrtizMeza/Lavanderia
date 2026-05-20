import { inject } from '@angular/core';
import {
  CanActivateFn,
  CanMatchFn,
  Router,
  UrlTree,
} from '@angular/router';
import { TokenStorageService } from '../../Auth/token-storage.service';

// ─── Ruta de destino para usuarios ya autenticados ────────────────────────────
const DASHBOARD_PATH = '/dashboard';

// ─── Lógica central reutilizable ──────────────────────────────────────────────
function resolvePublicAccess(): boolean | UrlTree {
  const auth   = inject(TokenStorageService);
  const router = inject(Router);

  return auth.isAuthenticated()
    ? router.createUrlTree([DASHBOARD_PATH])
    : true;
}

/**
 * Impide que un usuario ya autenticado acceda a rutas públicas (login).
 * Si ya tiene sesión activa lo redirige al dashboard.
 */
export const publicGuard: CanActivateFn = () => resolvePublicAccess();

/**
 * Versión canMatch: bloquea la carga diferida del módulo de login
 * si el usuario ya está autenticado.
 */
export const publicMatchGuard: CanMatchFn = () => resolvePublicAccess();

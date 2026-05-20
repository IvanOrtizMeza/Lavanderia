import { inject } from '@angular/core';
import {
  CanActivateFn,
  CanActivateChildFn,
  CanMatchFn,
  Router,
  UrlTree,
} from '@angular/router';
import { TokenStorageService } from '../../Auth/token-storage.service';

// ─── Ruta de fallback para usuarios no autenticados ───────────────────────────
const LOGIN_PATH = '/login';

// ─── Lógica central reutilizable ──────────────────────────────────────────────
function resolveAuthAccess(): boolean | UrlTree {
  const auth   = inject(TokenStorageService);
  const router = inject(Router);

  return auth.isAuthenticated()
    ? true
    : router.createUrlTree([LOGIN_PATH]);
}

/**
 * Protege la activación de una ruta raíz.
 * Redirige a /login si el usuario no está autenticado.
 */
export const authGuard: CanActivateFn = () => resolveAuthAccess();

/**
 * Protege todas las rutas hijas de un padre.
 * Útil para aplicar el guard a nivel de layout/módulo.
 */
export const authChildGuard: CanActivateChildFn = () => resolveAuthAccess();

/**
 * Previene la carga diferida (lazy load) del módulo si el usuario
 * no está autenticado. Es la defensa más temprana posible.
 */
export const authMatchGuard: CanMatchFn = () => resolveAuthAccess();

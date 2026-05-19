import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenStorageService } from '../Auth/token-storage.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  //para ver si hay token almacenado es decir si hay usuarioautenticado, si no hay token, simplemente pasa la petición sin modificarla
  const token = inject(TokenStorageService).getToken();

  if (!token) {
    return next(req);
  }
  //si hay token, clona la peticion original y agrega el encabezado de autorización 
  return next(
    req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    }),
  );
};

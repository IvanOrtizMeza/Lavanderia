import { Routes } from '@angular/router';
import { authMatchGuard } from '../Guards/Dashboard/auth.guard';
import { publicMatchGuard } from '../Guards/Login/public.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    canMatch: [publicMatchGuard],
    loadChildren: () => import('../Modules/Login/Route/Login').then((mod) => mod.Loginroutes),
  },
  {
    path: 'dashboard',
    canMatch: [authMatchGuard],
    loadChildren: () => import('../Modules/Dashboard/Route/Dashboard').then(m => m.Dashboardroutes),
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

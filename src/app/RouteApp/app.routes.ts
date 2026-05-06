import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('../Modules/Login/Route/Login').then((mod) => mod.Loginroutes) },
  { path: 'dashboard', loadChildren: () => import('../Modules/Dashboard/Route/Dashboard').then(m => m.Dashboardroutes) },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

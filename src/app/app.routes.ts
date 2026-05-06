import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { Users } from './users/users';
import { Settings } from './settings/settings';

export const routes: Routes = [
    {
    path: '',
    component: Layout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'users', component: Users },
      { path: 'settings', component: Settings },
      { path: 'pedidos', component: Settings },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

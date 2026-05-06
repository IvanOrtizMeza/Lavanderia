
import { Routes,  } from '@angular/router';
import { Dashboard } from '../dashboard';

export const Dashboardroutes: Routes = [
  { path: '', component: Dashboard ,
    // children: [
    //   { path: '', redirectTo: 'home', pathMatch: 'full' },
    //   // { path: 'home', loadComponent: () => import('../Pages/create-exhorto/create-exhorto.component').then(m => m.CreateExhortoComponent) },
    //   { path: 'home', loadComponent: () => import('../Pages/create-exhorto/create-exhorto.component').then(m => m.CreateExhortoComponent) },
    // ]
  },
  // {
  //   path: '**',
  //   redirectTo: 'home',
  // },

];


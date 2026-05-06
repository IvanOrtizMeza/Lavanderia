
import { Routes,  } from '@angular/router';
import { Login } from '../login';

export const Loginroutes: Routes = [
  { path: '', component: Login },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];


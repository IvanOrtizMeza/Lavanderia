import { Routes,  } from '@angular/router';
import { Layout } from '../../../layout/layout';
import { Settings } from '../../../settings/settings';
import { Users } from '../../../users/users';
import { Dashboard } from '../../../dashboard/dashboard';

export const Dashboardroutes: Routes = [
  { path: '', component: Layout ,
    children: [
      { path: '', component: Dashboard },
      { path: 'users', component: Users },
      { path: 'settings', component: Settings },
      { path: 'pedidos', component: Settings },


       
    ]
  },
  {
    path: '**',
    redirectTo: '',
  }
]


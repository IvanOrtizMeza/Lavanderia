import { Routes, } from '@angular/router';
import { Layout } from '../layout/layout';

export const Dashboardroutes: Routes = [
    {
        path: '', component: Layout,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: () => import('../Pages/home/Route/Home').then(m => m.Homeroutes) },
            { path: 'settings', loadChildren: () => import('../Pages/settings/Route/settings').then(m => m.Settingsoutes) },
            { path: 'users', loadChildren: () => import('../Pages/users/Route/user').then(m => m.Userroutes) },
            {path: 'dashboard', loadChildren: () => import('../Pages/dashboard/Route/Dashboard').then(m => m.Dashboardroutes) },
        ]
    },
    {
        path: '**',
        redirectTo: '',
    }
]


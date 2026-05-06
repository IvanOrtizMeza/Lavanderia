import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-nav',
  imports: [MatListModule, RouterLink,
    RouterLinkActive],
  templateUrl: './nav.html',
  styleUrls: ['./nav.scss'],
})
export class Nav {

  isMobile = false;
  opened = true;
  menu = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'people', label: 'Usuarios', route: '/users' },
    { icon: 'settings', label: 'Configuración', route: '/settings' },
    { icon: 'shopping_cart', label: 'Pedidos', route: '/pedidos' }
  ];

  onNavClick() {
    if (this.isMobile) {
      this.opened = false;
    }
  }
}

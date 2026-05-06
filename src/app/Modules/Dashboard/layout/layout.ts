import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { NgFor } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { Brand } from './mat-sidenav/components/brand/brand';
import { Footer } from './mat-sidenav/components/footer/footer';
const MOBILE_WIDTH = 768;

@Component({
  selector: 'app-layout',
  imports: [
    LayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatBadgeModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgFor,
    Brand,
    Footer


  ],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
})
export class Layout implements OnInit {
  menu = [
    { icon: 'home', label: 'Home', route: '/dashboard/home' },
    { icon: 'people', label: 'Usuarios', route: '/dashboard/users' },
    { icon: 'settings', label: 'Configuración', route: '/dashboard/settings' },
    { icon: 'shopping_cart', label: 'Pedidos', route: '/dashboard/pedidos' },
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard/dashboard' }, 
    
  ];

  isMobile = false;
  sidenavMode: 'side' | 'over' = 'side';
  opened = true;
  pageTitle = 'Dashboard';

  constructor(private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    this.checkSize(window.innerWidth);
    this.updateTitle(this.router.url);
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(e => {
        this.updateTitle((e as NavigationEnd).urlAfterRedirects);
        this.cdr.detectChanges();
      });
  }

  private updateTitle(url: string) {
    const match = this.menu.find(m => url.startsWith(m.route));
    this.pageTitle = match ? match.label : 'Dashboard';
  }

  @HostListener('window:resize')
  onResize() {
    this.checkSize(window.innerWidth);
  }

  private checkSize(width: number) {
    this.isMobile = width <= MOBILE_WIDTH;
    if (this.isMobile) {
      this.sidenavMode = 'over';
      this.opened = false;
    } else {
      this.sidenavMode = 'side';
      this.opened = true;
    }
    this.cdr.detectChanges();
  }

  toggleSidebar() {
    this.opened = !this.opened;
  }

  onNavClick() {
    if (this.isMobile) {
      this.opened = false;
    }
  }
}

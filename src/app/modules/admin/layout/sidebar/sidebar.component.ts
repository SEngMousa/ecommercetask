import { Component, OnInit, Output } from '@angular/core';

import { EventEmitter } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Router, NavigationExtras, NavigationEnd } from '@angular/router';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  baseMenuePages: any = [];
  activePageName = '0';

  public menuItems!: [];

  constructor(private translate: TranslateService, private router: Router) {}
  ngOnInit() {
    this.router.events.subscribe((event) => {});

    this.baseMenuePages.push({
      name: 'productManagment',
      active: true,
      pages: [
        { name: 'products', route: 'products' },
        { name: 'addProduct', route: 'product' },
      ],
    });
  }

  toggletNavActive(item: any) {
    item.active = !item.active;
  }
}

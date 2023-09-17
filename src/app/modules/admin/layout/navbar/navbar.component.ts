import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
} from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { EventEmitter } from '@angular/core';
import { NavService } from '../services/nav.service';
import { LocalizationService } from 'src/app/modules/core/services/localization.service';
import { AuthService } from 'src/app/modules/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public right_sidebar: boolean = false;
  public open: boolean = false;
  public openNav: boolean = false;
  public isOpenMobile!: boolean;
  public isCollapsed = true;

  @ViewChild('navbar-cmp', { static: false }) button!: ElementRef;
  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  constructor(
    private navServices: NavService,

    public translate: TranslateService,
    private localizationService: LocalizationService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  collapseSidebar() {
    this.open = !this.open;
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
  }

  right_side_bar() {
    this.right_sidebar = !this.right_sidebar;
    this.rightSidebarEvent.emit(this.right_sidebar);
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }

  ToEnglish() {
    this.localizationService.ToEnglish();
  }

  ToArabic() {
    this.localizationService.ToArabic();
  }

  logout() {
    this.authService.logout();
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    console.log(navbar);
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }
  }
}

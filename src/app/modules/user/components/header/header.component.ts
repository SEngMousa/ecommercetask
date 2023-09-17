import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { LocalizationService } from 'src/app/modules/core/services/localization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    public translate: TranslateService,
    private localizationService: LocalizationService,
    public authService: AuthService
  ) {}
  public stick: boolean = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    let number =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (number >= 90 && window.innerWidth > 400) {
      this.stick = true;
    } else {
      this.stick = false;
    }
  }

  toggleMenu() {
    const navigation = document.querySelector('.navigation');
    navigation?.classList.toggle('active');
  }
  toEnglish() {
    this.localizationService.ToEnglish();
  }
  toArabic() {
    this.localizationService.ToArabic();
  }
  signOut() {
    this.authService.logout();
  }
}

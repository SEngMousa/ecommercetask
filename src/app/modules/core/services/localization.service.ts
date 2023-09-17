import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  constructor(private translate: TranslateService) {}

  initializeLanguage() {
    const currentLan = localStorage.getItem('lan');
    if (currentLan == null) {
      this.translate.addLangs(['en', 'en']);
      this.translate.setDefaultLang('en');
      this.translate.use('en');
      localStorage.setItem('lan', 'en');
    } else {
      this.translate.setDefaultLang(currentLan);
      this.translate.use(currentLan);
    }
    if (this.translate.currentLang === 'ar') {
      document.body.className = 'rtl';
      document.body.setAttribute('dir', 'rtl');
    }
  }
  ToEnglish() {
    localStorage.setItem('lan', 'en');
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    document.body.className = 'ltr';
    document.body.removeAttribute('dir');
  }

  ToArabic() {
    localStorage.setItem('lan', 'ar');
    this.translate.setDefaultLang('ar');
    this.translate.use('ar');
    document.body.className = 'rtl';
    document.body.setAttribute('dir', 'rtl');
  }
}

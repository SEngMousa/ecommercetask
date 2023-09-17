import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalizationService } from '../services/localization.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LocalizationInterceptor implements HttpInterceptor {
  constructor(private translateService: TranslateService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const lang = this.translateService.currentLang;
    if (lang) {
      const cloned = request.clone({
        setHeaders: {
          'Accept-Language': lang,
        },
      });
      return next.handle(cloned);
    }
    return next.handle(request);
  }
}
// no use of this interceptor in the app because the api dosn't support localization

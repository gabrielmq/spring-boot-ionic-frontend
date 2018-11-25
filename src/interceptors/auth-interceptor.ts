import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { StorageService } from '../services/storage.service';
import { apiConfig } from '../config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storage: StorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let localUser = this.storage.getLocalUser();
    let requestToApi = req.url.substring(0, apiConfig.baseUrl.length) === apiConfig.baseUrl;

    if (localUser && requestToApi) {
      const authReq = req.clone({ 
        headers: req.headers.set('Authorization', `Bearer ${localUser}`) 
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};

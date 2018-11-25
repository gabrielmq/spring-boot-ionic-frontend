import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { CredenciaisDTO } from '../models/credenciais.dto';
import { apiConfig } from '../config/api.config';
import { StorageService } from "./storage.service";
import { LocalUser } from '../models/local_user';

import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) { }

  authenticate(creds: CredenciaisDTO) {
    return this.http.post(
      `${apiConfig.baseUrl}/login`, 
      creds, 
      { observe: 'response', responseType: 'text' });
  }

  refreshToken() {
    return this.http.post(
      `${apiConfig.baseUrl}/auth/refresh_token`,
      {},
      { observe: 'response', responseType: 'text' });
  }

  successfulLogin(authorizationValue: string) {
    let token = authorizationValue.substring(7);
    let email = this.jwtHelper.decodeToken(token).sub;
    let user: LocalUser = { token, email };
    this.storage.setLocalUser(user);
  }

  logout() {
    this.storage.setLocalUser(null);
  }
}
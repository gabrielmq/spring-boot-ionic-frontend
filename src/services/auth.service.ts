import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { CredenciaisDTO } from '../models/credenciais.dto';
import { apiConfig } from '../config/api.config';
import { StorageService } from "./storage.service";
import { LocalUser } from '../models/local_user';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) { }

  authenticate(creds: CredenciaisDTO) {
    return this.http.post(`${apiConfig.baseUrl}/login`, creds, { observe: 'response', responseType: 'text' });
  }

  successfulLogin(authorizationValue: string) {
    let token = authorizationValue.substring(7);
    let user: LocalUser = { token, email: '' };
    this.storage.setLocalUser(user);
  }

  logout() {
    this.storage.setLocalUser(null);
  }
}
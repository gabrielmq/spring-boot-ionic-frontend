import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { CredenciaisDTO } from '../models/credenciais.dto';
import { apiConfig } from '../config/api.config';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticate(creds: CredenciaisDTO) {
    return this.http.post(`${apiConfig.baseUrl}/login`, creds, { observe: 'response', responseType: 'text' });
  }
}
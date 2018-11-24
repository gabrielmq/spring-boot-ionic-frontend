import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Rx";

import { ClienteDTO } from "../../models/cliente.dto";
import { apiConfig } from "../../config/api.config";
import { StorageService } from '../storage.service';

@Injectable()
export class ClienteService {

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) { }

  findByEmail(email: string): Observable<ClienteDTO> {
    let authHeaders = new HttpHeaders({ 'Authorization': 'Bearer ' + this.storage.getLocalUser().token })
    return this.http.get<ClienteDTO>(
      `${apiConfig.baseUrl}/clientes/email?value=${email}`,
      { 'headers': authHeaders }
    );
  }

  getImageFromBucket(id: string): Observable<any> {
    return this.http.get(
      `${apiConfig.bucketBaseUrl}/cp${id}.jpg`, 
      { responseType: 'blob' }
    );
  }
}
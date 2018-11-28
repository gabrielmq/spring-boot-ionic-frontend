import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Rx";

import { ClienteDTO } from "../../models/cliente.dto";
import { apiConfig } from "../../config/api.config";

@Injectable()
export class ClienteService {

  constructor(private http: HttpClient) { }

  findByEmail(email: string): Observable<ClienteDTO> {
    return this.http.get<ClienteDTO>(`${apiConfig.baseUrl}/clientes/email?value=${email}`);
  }

  getImageFromBucket(id: string): Observable<any> {
    return this.http.get(
      `${apiConfig.bucketBaseUrl}/cp${id}.jpg`, 
      { responseType: 'blob' }
    );
  }

  insert(cliente: ClienteDTO) {
    return this.http.post(
      `${apiConfig.baseUrl}/clientes`, cliente,
      { observe: 'response', responseType: 'text' }
    );
  }
}
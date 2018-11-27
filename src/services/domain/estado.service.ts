import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { EstadoDTO } from "../../models/estado.dto";
import { apiConfig } from "../../config/api.config";

@Injectable()
export class EstadoService {

  constructor(private http: HttpClient) { }

  findEstados(): Observable<EstadoDTO[]> {
    return this.http.get<EstadoDTO[]>(`${apiConfig.baseUrl}/estados`);
  }
}
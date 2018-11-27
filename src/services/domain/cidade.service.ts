import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Rx";

import { CidadeDTO } from '../../models/cidade.dto';
import { apiConfig } from "../../config/api.config";

@Injectable()
export class CidadeService {

  constructor(private http: HttpClient) { }

  findCidades(estadoId: string): Observable<CidadeDTO[]> {
    return this.http.get<CidadeDTO[]>(`${apiConfig.baseUrl}/estados/${estadoId}/cidades`);
  }
}
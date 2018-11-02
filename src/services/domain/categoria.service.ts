import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

import { CategoriaDTO } from "../../models/categoria.dto";
import { apiConfig } from "../../config/api.config";

@Injectable()
export class CategoriaService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<CategoriaDTO[]> {
    return this.http.get<CategoriaDTO[]>(`${apiConfig.baseUrl}/categorias`);
  }
}
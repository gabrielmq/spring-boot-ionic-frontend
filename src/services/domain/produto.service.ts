import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { apiConfig } from "../../config/api.config";

@Injectable()
export class ProdutoService {

  constructor(private http: HttpClient) { }

  findByCategoria(categoriaId: string) {
    return this.http.get(`${apiConfig.baseUrl}/produtos/?categorias=${categoriaId}`);
  }

  getSmallImageFromBucket(id: string): Observable<any> {
    return this.http.get(`${apiConfig.bucketBaseUrl}/prod${id}-small.jpg`, { responseType: 'blob' });
  }
}
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { apiConfig } from "../../config/api.config";
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable()
export class ProdutoService {

  constructor(private http: HttpClient) { }

  findById(produtoId: string) {
    return this.http.get<ProdutoDTO>(`${apiConfig.baseUrl}/produtos/${produtoId}`);
  }

  findByCategoria(categoriaId: string) {
    return this.http.get(`${apiConfig.baseUrl}/produtos/?categorias=${categoriaId}`);
  }

  getSmallImageFromBucket(id: string): Observable<any> {
    return this.http.get(`${apiConfig.bucketBaseUrl}/prod${id}-small.jpg`, { responseType: 'blob' });
  }

  getImageFromBucket(id: string): Observable<any> {
    return this.http.get(`${apiConfig.bucketBaseUrl}/prod${id}.jpg`, { responseType: 'blob' });
  }
}
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { PedidoDTO } from "../../models/pedido.dto";
import { apiConfig } from "../../config/api.config";

@Injectable()
export class PedidoService {

  constructor(public http: HttpClient) { }

  insert(obj: PedidoDTO) {
    return this.http.post(
      `${apiConfig.baseUrl}/pedidos`, obj,
      { observe: 'response', responseType: 'text' }
    );
  }
}
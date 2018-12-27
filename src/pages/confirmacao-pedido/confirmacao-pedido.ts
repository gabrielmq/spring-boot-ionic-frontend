import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PedidoDTO } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart-item';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { CartService } from '../../services/domain/cart.service';
import { PedidoService } from '../../services/domain/pedido.service';

@IonicPage()
@Component({
  selector: 'page-confirmacao-pedido',
  templateUrl: 'confirmacao-pedido.html',
})
export class ConfirmacaoPedidoPage {

  pedido: PedidoDTO;
  cartItens: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  codpedido: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public clienteService: ClienteService,
    public cartService: CartService,
    public pedidoService: PedidoService) {

    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItens = this.cartService.getCart().itens;

    this.clienteService
      .findById(this.pedido.cliente.id)
      .subscribe(res => {
        this.cliente = res as ClienteDTO;
        this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, res['enderecos']);
      },
      err => {
        this.navCtrl.setRoot('HomePage');
      }
    );
  }

  private findEndereco(id: string, list: EnderecoDTO[]): EnderecoDTO {
    const position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total(): number {
    return this.cartService.total();
  }

  home() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  back() {
    this.navCtrl.setRoot('CartPage');
  }

  checkout() {
    this.pedidoService.insert(this.pedido)
      .subscribe(res => {
        this.cartService.createOrClearCart();
        this.codpedido = this.extractId(res.headers.get('location'));
      },
      err => {
        if (err.status === 403) {
          this.navCtrl.setRoot('HomePage');
        }
      }
    );
  }

  private extractId(location: string): string {
    const position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }
}

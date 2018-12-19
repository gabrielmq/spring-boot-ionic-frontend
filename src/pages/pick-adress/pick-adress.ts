import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EnderecoDTO } from '../../models/endereco.dto';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { CartService } from '../../services/domain/cart.service';
import { PedidoDTO } from '../../models/pedido.dto';

@IonicPage()
@Component({
  selector: 'page-pick-adress',
  templateUrl: 'pick-adress.html',
})
export class PickAdressPage {

  items: EnderecoDTO[];
  pedido: PedidoDTO;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService,
  ) { }

  ionViewDidLoad() {
    const localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) {
      this.clienteService
        .findByEmail(localUser.email)
        .subscribe(res => {
          this.items = res['enderecos'];

          const cart = this.cartService.getCart();
          this.pedido = {
            cliente: { id: res['id'] },
            enderecoDeEntrega: null,
            pagamento: null,
            itens: cart.itens.map(item => (
              { quantidade: item.quantidade, produto: { id: item.produto.id } }
            ))
          }
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        }
      );
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  nextPage(item: EnderecoDTO) {
    const { id } = item;
    this.pedido.enderecoDeEntrega = { id };
    this.navCtrl.push('PagamentoPage', { pedido: this.pedido });
  }
}

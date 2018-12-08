import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CartItem } from '../../models/cart-item';
import { apiConfig } from '../../config/api.config';
import { ProdutoService } from '../../services/domain/produto.service';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  itens: CartItem[];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public produtoService: ProdutoService,
  ) { }

  ionViewDidLoad() {
    const cart = this.cartService.getCart();
    this.itens = cart.itens;
    this.loadImageUrls;
  }

  loadImageUrls() {
    for (let i = 0; i < this.itens.length; i++) {
      const item = this.itens[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(res => {
          item.produto.imageUrl = `${apiConfig.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
        },
        err => { });
    }
  }

  removeItem(produto: ProdutoDTO) {
    this.itens = this.cartService.removeProduto(produto).itens;
  }

  increaseQuantity(produto: ProdutoDTO) {
    this.itens = this.cartService.increaseQuantity(produto).itens;
  }

  decreaseQuantity(produto: ProdutoDTO) {
    this.itens = this.cartService.decreaseQuantity(produto).itens;
  }

  total(): number {
    return this.cartService.total();
  }

  goOn() {
    this.navCtrl.setRoot('CategoriasPage');
  }
}

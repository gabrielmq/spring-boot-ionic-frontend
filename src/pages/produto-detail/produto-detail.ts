import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { apiConfig } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public cartService: CartService,
  ) { }

  ionViewDidLoad() {
    let produtoId = this.navParams.get('produtoId');
    this.produtoService
      .findById(produtoId)
      .subscribe(res => { 
        this.item = res;
        this.getImageUrlIfExists();
      }, 
      err => {}
    );
  }

  getImageUrlIfExists() {
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(res => {
        this.item.imageUrl = `${apiConfig.bucketBaseUrl}/prod${this.item.id}.jpg`;
      },
      err => {}
      );
  }

  addToCart(produto: ProdutoDTO) {
    this.cartService.addProduto(produto);
    this.navCtrl.setRoot('CartPage');
  }
}

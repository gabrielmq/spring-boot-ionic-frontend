import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { apiConfig } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
  ) { }
  
  ionViewDidLoad() {
    let categoriaId = this.navParams.get('categoriaId'); // pega o parametro da página
    this.produtoService
      .findByCategoria(categoriaId)
      .subscribe(res => {
        this.items = res['content']
        this.loadImageUrls();
      }, 
      err => {} 
    );
  };

  loadImageUrls() {
    for (let i = 0; this.items.length; i++) {
      let item = this.items[i];

      this.produtoService
        .getSmallImageFromBucket(item.id)
        .subscribe(
          res => item.imageUrl = `${apiConfig.bucketBaseUrl}/prod${item.id}-small.jpg`,
          err => {}
        );
    }
  }
}

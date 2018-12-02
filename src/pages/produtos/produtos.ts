import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

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
      .subscribe(
        res => this.items = res['content'], 
        err => {} 
      );
  };
}

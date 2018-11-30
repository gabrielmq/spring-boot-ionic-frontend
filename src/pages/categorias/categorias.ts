import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { apiConfig } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = apiConfig.bucketBaseUrl;
  items: CategoriaDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public service: CategoriaService,
  ) { }

  ionViewDidLoad() {
    this.service.findAll()
    .subscribe(
      res => this.items = res,
      err => { }
    );
  }

  showProdutos() {
    this.navCtrl.push('ProdutosPage');
  }
}
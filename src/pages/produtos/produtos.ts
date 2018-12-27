import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { apiConfig } from '../../config/api.config';

import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html'
})
export class ProdutosPage {
  items: ProdutoDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    const categoriaId = this.navParams.get('categoriaId'); // pega o parametro da página
    const loader = this.presentLoading();
    
    this.produtoService.findByCategoria(categoriaId).subscribe(res => {
        this.items = res['content'];
        loader.dismiss();
        this.loadImageUrls();
      }, err => {
        loader.dismiss();
      }
    );
  }

  loadImageUrls() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id).subscribe(
        res => {
          item.imageUrl = `${apiConfig.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        err => {}
      );
    }
  }

  showDetail(produtoId: string) {
    this.navCtrl.push('ProdutoDetailPage', { produtoId });
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({ content: 'Aguarde...' });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => refresher.complete(), 1000);
  }
}

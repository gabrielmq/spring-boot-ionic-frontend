import { Injectable } from "@angular/core";

import { StorageService } from '../storage.service';
import { Cart } from '../../models/cart';
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable()
export class CartService {

  constructor(private storage: StorageService) { }

  createOrClearCart() {
    const cart: Cart = { itens: [] };
    this.storage.setCart(cart);
    return cart;
  }

  getCart() {
    let cart: Cart = this.storage.getCart();
    if (cart != null) {
      cart = this.createOrClearCart();
    }
    
    return cart;
  }

  addProduto(produto: ProdutoDTO): Cart {
    const cart = this.getCart();
    const position = cart.itens.findIndex(item => item.produto.id === produto.id);

    if (position === -1) {
      cart.itens.push({ quantidade: 1, produto });
    }

    this.storage.setCart(cart);
    return cart;
  }
}
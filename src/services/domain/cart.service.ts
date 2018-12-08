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
    if (cart === null) {
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

  removeProduto(produto: ProdutoDTO): Cart {
    const cart = this.getCart();
    const position = cart.itens.findIndex(item => item.produto.id === produto.id);

    if (position != -1) {
      cart.itens.splice(position, 1);
    }

    this.storage.setCart(cart);
    return cart;
  }

  increaseQuantity(produto: ProdutoDTO): Cart {
    const cart = this.getCart();
    const position = cart.itens.findIndex(item => item.produto.id === produto.id);

    if (position != -1) {
      cart.itens[position].quantidade++;
    }

    this.storage.setCart(cart);
    return cart;
  }

  decreaseQuantity(produto: ProdutoDTO): Cart {
    let cart = this.getCart();
    const position = cart.itens.findIndex(item => item.produto.id === produto.id);

    if (position != -1) {
      cart.itens[position].quantidade--;

      if (cart.itens[position].quantidade < 1) {
        cart = this.removeProduto(produto);
      }
    }

    this.total();
    this.storage.setCart(cart);
    return cart;
  }

  total(): number {
    const cart = this.getCart();
    return cart.itens.reduce((sum, elem) => sum += elem.produto.preco * elem.quantidade, 0);
  }
}
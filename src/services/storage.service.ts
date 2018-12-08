import { Injectable } from "@angular/core";

import { LocalUser } from '../models/local_user';
import { STORAGE_KEYS } from '../config/storage_keys.config';
import { Cart } from '../models/cart';

@Injectable()
export class StorageService {
  
  getLocalUser(): LocalUser {
    const user = localStorage.getItem(STORAGE_KEYS.localuser);
    if (user === null) {
      return null;
    }
    else { 
      return JSON.parse(user);
    }
  }  

  setLocalUser(localUser: LocalUser) {
    if (localUser === null)
      localStorage.removeItem(STORAGE_KEYS.localuser);
    else
      localStorage.setItem(STORAGE_KEYS.localuser, JSON.stringify(localUser));
  }

  getCart(): Cart {
    const cart = localStorage.getItem(STORAGE_KEYS.cart);
    if (cart != null) {
      return JSON.parse(cart);
    }

    return null;
  }

  setCart(cart: Cart) {
    if (cart != null) 
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    else 
      localStorage.removeItem(STORAGE_KEYS.cart);
  }
}

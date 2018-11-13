import { Injectable } from "@angular/core";

import { LocalUser } from '../models/local_user';
import { STORAGE_KEYS } from '../config/storage_keys.config';

@Injectable()
export class StorageService {
  
  getLocalUser(): LocalUser {
    let user = localStorage.getItem(STORAGE_KEYS.localuser);
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
}

import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = { email: '', senha: '' };

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public authService: AuthService
  ) { }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  } 

  ionViewDidEnter(){
    this.authService.refreshToken()
      .subscribe(res => {
        this.authService.successfulLogin(res.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
      err => {});
  }

  login() {
    this.authService.authenticate(this.creds)
      .subscribe(res => {
        this.authService.successfulLogin(res.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
      err => {});
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}

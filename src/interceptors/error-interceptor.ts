import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

import { AlertController } from 'ionic-angular';

import { StorageService } from '../services/storage.service';
import { FieldMessage } from '../models/field-message';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private storage: StorageService,
    private alertCtrl: AlertController
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch((error, caught) => {

        let err = error;
        if (err.error) err = err.error;

        if (!err.status) err = JSON.parse(err);

        console.log(`erro pego pelo interceptor: ${err.error}`);

        switch(err.status) {
          case 401:
            this.handle401();
            break;
          case 403:
            this.handle403();
            break;
          case 422:
            this.handle422(err);
            break;
          default:
            this.handleDefaultError(err);
        }

        return Observable.throw(err);
      }
    ) as any;
  }

  handle401() {
    let alert = this.alertCtrl.create({
      title: 'Falha de autenticação',
      message: 'Email e/ou senha inválidos.',
      enableBackdropDismiss: false,
      buttons: [
        { text: 'Ok' },
      ],
    });

    alert.present();
  }

  handle403() {
    this.storage.setLocalUser(null);
  }

  handle422(err) {
    let alert = this.alertCtrl.create({
      title: err.error,
      message: this.listErrors(err.errors),
      enableBackdropDismiss: false,
      buttons: [
        { text: 'Ok' },
      ],
    });

    alert.present();
  }

  private listErrors(messages: FieldMessage[]): string {
    let error: string = '';

    for (let i = 0; i < messages.length; i++) {
      error += `<p>
                  <strong>${messages[i].fieldName}</strong>: ${messages[i].message}
                </p>`;
    }

    return error;
  }

  handleDefaultError(err) {
    let alert = this.alertCtrl.create({
      title: err.error,
      message: err.message,
      enableBackdropDismiss: false,
      buttons: [
        { text: 'Ok' }
      ],
    });

    alert.present();
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
}
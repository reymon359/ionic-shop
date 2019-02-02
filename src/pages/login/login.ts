import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { UsuarioProvider } from "../../providers/usuario/usuario";
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  correo: string = "";
  contrasena: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
    private usuarioProv: UsuarioProvider) {
  }

  ingresar() {
    this.usuarioProv.ingresar(this.correo, this.contrasena)
      //me subscribo al ingresar del usuario provider
      .subscribe(() => {
        if (this.usuarioProv.activo()) {
          this.viewCtrl.dismiss(true);
        }
      })
  }

}

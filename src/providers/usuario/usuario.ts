import { HttpClient } from '@angular/common/http';
import { Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { AlertController, Platform } from "ionic-angular";
import { URL_PROVIDERS } from "../../config/url.providers";
import { Storage } from '@ionic/storage';

@Injectable()
export class UsuarioProvider {
  token: string;
  id_usuario: string;
  constructor(
    public http: Http, private alertCtrl: AlertController, private platform: Platform, private storage: Storage  ) {
      this.cargar_storage();
  }
  //esto devuelve true o false si el usuario esta logueado
  activo(): boolean {
    if (this.token) {
      return true;
    } else {
      return false;
    }
  }
  ingresar(correo: string, contrasena: string) {
    //esto es para mandar el correo y pass porque el body es de tipo x-www-form-urlencoded
    let data = new URLSearchParams();
    data.append("correo", correo);
    data.append("contrasena", contrasena);

    let url = URL_PROVIDERS + "/login";
    return this.http.post(url, data)
      .map(resp => {
        let data_resp = resp.json();
        console.log(data_resp);
        if (data_resp.error) {
          this.alertCtrl.create({
            title: "Error al iniciar",
            subTitle: data_resp.mensaje,
            buttons: ["OK"]

          }).present();
        } else {
          this.token = data_resp.token;
          this.id_usuario = data_resp.id_usuario;
          this.guardar_storage();
        }
      });
  }
  cerrar_sesion() {
    this.token = null;
    this.id_usuario = null;
    this.guardar_storage();

  }
  private guardar_storage() {
    if (this.platform.is("cordova")) {
      //dispositivo
      this.storage.set('token', this.token);
      this.storage.set('id_usuario', this.id_usuario);
    } else {
      //computadora
      if (this.token) {
        localStorage.setItem("token", this.token);
        localStorage.setItem("id_usuario", this.id_usuario);

      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("id_usuario");
      }
    }
  }
  cargar_storage() {
    let promesa = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        //dispositivo
        this.storage.ready()
          .then(() => {
            this.storage.get("token")
              .then(token => {
                if (token) {
                  this.token = token;
                }
              })
            this.storage.get("id_usuario")
              .then(id_usuario => {
                if (id_usuario) {
                  this.id_usuario = id_usuario;
                }
                resolve();
              })
          })
      } else {
        //computadora
        //si existen los items en el localstorage los carga y si no pues nada
        if (localStorage.getItem("token")) {
          this.token = localStorage.getItem("token");
          this.id_usuario = localStorage.getItem("id_usuario");
        }
        resolve();
      }
    });
    return promesa;
  }
}

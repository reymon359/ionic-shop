import { HttpClient } from '@angular/common/http';
import { Http, URLSearchParams } from "@angular/http";
import { Injectable } from '@angular/core';
import { AlertController, Platform, ModalController } from "ionic-angular";
import { Storage } from '@ionic/storage';
//providers
import { URL_PROVIDERS } from "../../config/url.providers";
import { UsuarioProvider } from "../usuario/usuario";
//paginas
import { LoginPage, CarritoPage } from "../../pages/index.paginas";
@Injectable()
export class CarritoProvider {
  items: any[] = [];
  total_carrito: number = 0;
  ordenes: any[] = [];
  constructor(public http: Http, private alertCrtl: AlertController, private platform: Platform,
    private storage: Storage, private usuarioProv: UsuarioProvider, private modalCtrl: ModalController) {
    this.cargar_storage();
    this.actualizar_total();
  }
  remove_item(idx: number) {
    this.items.splice(idx, 1);
    this.guardar_storage();
  }
  realizar_pedido() {
    let data = new URLSearchParams();
    let codigos: string[] = [];
    for (let item of this.items) {
      codigos.push(item.codigo);
    }
    data.append("items", codigos.join(","));
    let url = `${URL_PROVIDERS}/pedidos/realizar_orden/${this.usuarioProv.token}/${this.usuarioProv.id_usuario}`;
    this.http.post(url, data)
      //para la respuesta se puede usar el map o el subscribe
      .subscribe(resp => {
        let respuesta = resp.json();
        if (respuesta.error) {
          //mostramos error
          this.alertCrtl.create({
            title: "Error en la orden",
            subTitle: respuesta.mensaje,
            buttons: ["OK"]
          }).present();
        } else {
          //todo bien
          this.items = [];
          this.guardar_storage();
          this.alertCrtl.create({
            title: "Orden realizada!",
            subTitle: "Nos contactaremos con usted proximamente.",
            buttons: ["OK"]
          }).present();

        }
      })
  }

  ver_carrito() {
    let modal: any;
    if (this.usuarioProv.token) {
      //mostrar pagina del carrito
      modal = this.modalCtrl.create(CarritoPage);

    } else {
      //mostrar el login
      modal = this.modalCtrl.create(LoginPage);
    }
    modal.present();
    //tambien vamos a crear ua funcion para que vaya directamente al carrito una vez haya hecho login
    modal.onDidDismiss((abrirCarrito: boolean) => {
      if (abrirCarrito) {
        this.modalCtrl.create(CarritoPage).present();
      }
    })
  }
  agregar_carrito(item_parametro: any) {
    //primero verificar que no exista el item ya en el carrito
    for (let item of this.items) {
      if (item.codigo == item_parametro.codigo) {
        this.alertCrtl.create({
          title: 'Item existe.',
          subTitle: item_parametro.producto + ", ya se encuentra en su carrito de compra.",
          buttons: ["OK"]
        }).present();
        return;
      }
    }
    //si llega aqui es porque no estaba el item ya en el carrito
    this.items.push(item_parametro);
    this.actualizar_total();
    this.guardar_storage();
  }
  actualizar_total() {
    this.total_carrito = 0;
    for (let item of this.items) {
      this.total_carrito += Number(item.precio_compra);
    }
  }
  private guardar_storage() {
    if (this.platform.is("cordova")) {
      //dispositivo
      this.storage.set('items', this.items);
    } else {
      //computadora
      localStorage.setItem("items", JSON.stringify(this.items));
    }
  }
  cargar_storage() {
    let promesa = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        //dispositivo
        this.storage.ready()
          .then(() => {
            this.storage.get("items")
              .then(items => {
                if (items) {
                  this.items = items;
                }
                resolve();
              })
          })
      } else {
        //computadora
        //si existen los items en el localstorage los carga y si no pues nada
        if (localStorage.getItem("items")) {
          this.items = JSON.parse(localStorage.getItem("items"));
        }
        resolve();
      }
    });
    return promesa;
  }
  cargar_ordenes() {
    let url = `${URL_PROVIDERS}/pedidos/obtener_pedidos/${this.usuarioProv.token}/${this.usuarioProv.id_usuario}`;
    this.http.get(url)
      .map(resp => resp.json())
      .subscribe(data => {
        if (data.error) {
          //manejar el error
        } else {
          this.ordenes = data.ordenes;
        }
      })
  }
  borrar_orden(orden_id: string) {
    let url = `${URL_PROVIDERS}/pedidos/borrar_pedido/${this.usuarioProv.token}/${this.usuarioProv.id_usuario}/${orden_id}`;
    return this.http.delete(url)
      .map(resp => resp.json());
  }
}

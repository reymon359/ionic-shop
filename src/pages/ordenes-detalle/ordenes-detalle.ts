import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CarritoProvider } from "../../providers/carrito/carrito";
@IonicPage()
@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {
  orden: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private carritoProv: CarritoProvider) {
    this.orden = this.navParams.get("orden");

  }
  borrar_orden(orden_id: string) {
    this.carritoProv.borrar_orden(orden_id)
      .subscribe(data => {
        if (data.error) {
          //manejo de error
        } else {
          this.navCtrl.pop();
        }
      })
  }


}

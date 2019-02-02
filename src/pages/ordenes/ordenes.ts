import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CarritoProvider } from "../../providers/carrito/carrito";

import { OrdenesDetallePage } from "../ordenes-detalle/ordenes-detalle";
@IonicPage()
@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {
  ordenesDetalle = OrdenesDetallePage;
  constructor(public navCtrl: NavController, public navParams: NavParams, private carritoProv: CarritoProvider) {
  }

  ionViewWillEnter() {
    console.log('cargando ordenes');
    this.carritoProv.cargar_ordenes();
  }

}

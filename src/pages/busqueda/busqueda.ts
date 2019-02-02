import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProductosProvider } from "../../providers/productos/productos";

import { ProductoPage } from "../producto/producto";

@IonicPage()
@Component({
  selector: 'page-busqueda',
  templateUrl: 'busqueda.html',
})
export class BusquedaPage {
  productoPage = ProductoPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, private productosProv: ProductosProvider) {
  }
  buscar_productos(ev: any) {
    const valor = ev.target.value;
    this.productosProv.buscar_producto(valor);
  }
}

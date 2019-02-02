import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProductosProvider } from "../../providers/productos/productos";
import { PorCategoriasPage } from "../index.paginas";
@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
  porCategoriasPage = PorCategoriasPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, private productosProv: ProductosProvider) {
  }


}

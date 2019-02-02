import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductosProvider } from "../../providers/productos/productos";
import { ProductoPage } from "../producto/producto";


@IonicPage()
@Component({
  selector: 'page-por-categorias',
  templateUrl: 'por-categorias.html',
})
export class PorCategoriasPage {
  productoPage= ProductoPage;
  categoria: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private productosProv: ProductosProvider) {
    this.categoria = this.navParams.get("categoria");
    this.productosProv.cargar_por_categoria(this.categoria.id);
  }



}

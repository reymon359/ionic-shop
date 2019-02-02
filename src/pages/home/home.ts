import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//providers
import { ProductosProvider } from "../../providers/productos/productos";
import { CarritoProvider } from "../../providers/carrito/carrito";
import { UsuarioProvider } from "../../providers/usuario/usuario";
//paginas
import { ProductoPage } from "../producto/producto";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  productoPage = ProductoPage;
  constructor(public navCtrl: NavController, private productosProv: ProductosProvider, private carritoProv: CarritoProvider,
  private usuarioProv:UsuarioProvider) {

  }
  siguientePagina(infiniteScroll) {
    this.productosProv.cargar_todos()
      .then(() => {
        infiniteScroll.complete();
      })
  }
}

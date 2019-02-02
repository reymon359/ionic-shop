import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
//paginas
import { HomePage, CategoriasPage, OrdenesPage } from "../index.paginas";

// @IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1 = HomePage;
  tab2 = CategoriasPage;
  tab3 = OrdenesPage;
  //como Busquedapage no esta en elindex, vamos a usar su modulo. simplemente ponemos entrecomillas
  //lo que haya en el declarations del busqueda.module.ts
  tab4 = "BusquedaPage";
  // constructor(public navCtrl: NavController, public navParams: NavParams) {
  // }



}

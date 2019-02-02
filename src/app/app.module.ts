import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { map } from 'rxjs/operators';

import { HttpModule } from "@angular/http";
import { HttpClient, HttpClientModule } from '@angular/common/http';


import { MyApp } from './app.component';
//paginas
import {
  CarritoPage, CategoriasPage, HomePage, LoginPage, OrdenesPage,
  OrdenesDetallePage, PorCategoriasPage, ProductoPage, TabsPage
} from "../pages/index.paginas";
//providers
import { CarritoProvider } from '../providers/carrito/carrito';
import { ProductosProvider } from '../providers/productos/productos';
import { UsuarioProvider } from '../providers/usuario/usuario';
//pipes
import { ImagenPipe } from '../pipes/imagen/imagen';
//storage
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    MyApp,
    ImagenPipe,
    CarritoPage, CategoriasPage, HomePage, LoginPage, OrdenesPage,
    OrdenesDetallePage, PorCategoriasPage, ProductoPage, TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CarritoPage, CategoriasPage, HomePage, LoginPage, OrdenesPage,
    OrdenesDetallePage, PorCategoriasPage, ProductoPage, TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CarritoProvider,
    HttpClient,
    ProductosProvider,
    UsuarioProvider
  ]
})
export class AppModule { }

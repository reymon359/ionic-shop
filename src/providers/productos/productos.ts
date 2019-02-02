
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { URL_PROVIDERS } from "../../config/url.providers";
@Injectable()
export class ProductosProvider {
  pagina: number = 0;
  //productos sera un array de pares para que podamos mostrarlo en pares en el home
  productos: any[] = [];
  lineas: any[] = [];
  porCategoria: any[] = [];
  resultados: any[] = [];
  constructor(public httpNew: HttpClient, public http: Http) {
    // console.log('Hello ProductosProvider Provider');
    this.cargar_todos(); /*esta funcion solo se ejecutara una vez
     carguemos la aplicacion no cada vez que carguemos una pagina porque los servicios son compartidos entre todas las paginas*/
    this.cargar_lineas();
  }
  //cargar las lineas, grupos de productos
  cargar_lineas() {
    let url = URL_PROVIDERS + "/lineas";
    this.http.get(url)
      .map(resp => resp.json())
      .subscribe(data => {
        if (data.error) {
          //problema
        } else {
          this.lineas = data.lineas;
        }
      })
  }
  //cargar por categoria
  cargar_por_categoria(categoria: number) {
    let url = URL_PROVIDERS + "/productos/por_tipo/" + categoria;
    //se podria implementar tambien un sistema de infinite scroll con paginacion y tal
    //lo de la paginacion ya esta implementado, faltaria la parte el infinite scroll
    this.http.get(url)
      .map(resp => resp.json())
      .subscribe(data => {
        if (data.error) {
          //problema
        } else {
          this.porCategoria = data.productos;
        }
      });
  }
  cargar_todos() {
    // vamos a crear un apromesa para poder manejar el infinite scroll sin poner todo este codigo en el home
    let promesa = new Promise((resolve, reject) => {
      let url = URL_PROVIDERS + "/productos/todos/" + this.pagina;
      this.http.get(url)
        .map(resp => resp.json())
        .subscribe(data => {
          if (data.error) {
            //problema
          } else {
            let nuevaData = this.agrupar(data.productos, 2);
            this.productos.push(...nuevaData);
            this.pagina += 1;
          }
          resolve();//aqi acaba la promesa
        })
    });
    return promesa;
  }
  //esta funcion es para agrupar los productos en pares
  private agrupar(array: any, tamano: number) {
    let nuevoArreglo = [];
    for (let i = 0; i < array.length; i += tamano) {
      nuevoArreglo.push(array.slice(i, i + tamano));
    }
    return nuevoArreglo;
  }
  buscar_producto(termino: string) {
    let url = URL_PROVIDERS + "/productos/buscar/" + termino;
    this.http.get(url)
      .subscribe(resp => {
        let data = resp.json();
        this.resultados= data.productos;
        
      })
  }
}

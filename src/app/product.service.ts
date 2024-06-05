// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './producto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.endpoint;

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}productos`);
  }

  getProductoById(codigo: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}productos/${codigo}`);
  }

  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}productos`, producto);
  }

  editarProducto(codigo: number, producto: Producto): Observable<any> {
    return this.http.put(`${this.apiUrl}productos/${codigo}`, producto);
  }

  eliminarProducto(codigo: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}productos/${codigo}`);
  }

  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}categorias`);
  }

  getMarcas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}marcas`);
  }

  getUnidadesMedida(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}unidadmedida`);
  }
}

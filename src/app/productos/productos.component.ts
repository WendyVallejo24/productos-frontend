import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Categoria, Marca, Producto, UnidadMedida } from '../producto.model';

interface DataResponse<T> {
  $id: string;
  $values: T[];
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];
  nuevoProducto: Producto = {
    codigo: 0,
    nombre: '',
    precio: 0,
    existencia: 0,
    idCategoria: 0,
    idMarca: 0,
    idUnidadMed: 0
  };

  categorias: Categoria[] = [];
  marcas: Marca[] = [];
  unidadesMedida: UnidadMedida[] = [];

  productoSeleccionado: Producto = {
    codigo: 0,
    nombre: '',
    precio: 0,
    existencia: 0,
    idCategoria: 0,
    idMarca: 0,
    idUnidadMed: 0
  };
  modoEdicion = false;
  productoEditando: Producto | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProductos();
    this.getCategorias();
    this.getMarcas();
    this.getUnidadesMedida();

  }

  getProductos(): void {
    this.productService.getProductos().subscribe((data: any) => {
      console.log("Datos recibidos de productos:", data);
      if (data && data.$values && Array.isArray(data.$values)) {
        this.productos = data.$values;
      } else {
        console.error("Error al recibir los productos.");
        this.productos = [];
      }
    });
  }

  getCategorias(): void {
    this.productService.getCategorias().subscribe((data: any) => {
      this.categorias = data.$values || [];
      console.log("Categorias:", this.categorias);
    });
  }


  getMarcas(): void {
    this.productService.getMarcas().subscribe((data: any) => {
      this.marcas = data.$values || [];
      console.log("Marcas:", this.marcas);
    });
  }

  getUnidadesMedida(): void {
    this.productService.getUnidadesMedida().subscribe((data: any) => {
      this.unidadesMedida = data.$values || [];
      console.log("Unidades de medida:", this.unidadesMedida);
    });
  }

  crearProducto(): void {
    console.log("Formulario enviado.");
    console.log("Categorias:", this.categorias);
    console.log("Marcas:", this.marcas);
    console.log("Unidades de medida:", this.unidadesMedida);
    console.log("Producto antes de enviar:", JSON.stringify(this.nuevoProducto));

    if (this.nuevoProducto.idCategoria && this.nuevoProducto.idMarca && this.nuevoProducto.idUnidadMed) {
      this.productService.crearProducto(this.nuevoProducto).subscribe(() => {
        console.log('Producto creado exitosamente');
        alert("Producto creado exitosamente");
        this.getProductos(); // Actualizar la lista de productos
        this.resetForm();    // Resetear el formulario
      }, (error) => {
        console.error('Error al crear el producto:', error);
      });
    } else {
      console.error('Error: Asegúrate de que todas las selecciones están hechas.');
    }
  }

  seleccionarProducto(producto: Producto): void {
    this.productoSeleccionado = producto;
    this.productoEditando = producto;
    console.log("Producto editando:", this.productoEditando);
    this.modoEdicion = true;
  }

  editarProducto(): void {
    if (this.productoSeleccionado && this.productoSeleccionado.codigo !== undefined) {
      this.productService.editarProducto(this.productoSeleccionado.codigo, this.productoSeleccionado).subscribe(() => {
        console.log('Producto actualizado exitosamente');
        alert("Producto actualizado exitosamente")
        this.getProductos();
        this.resetForm();
      });
    }
  }

  eliminarProducto(id: number): void {
    this.productService.eliminarProducto(id).subscribe(() => {
      console.log('Producto eliminado exitosamente');
      alert("Producto eliminado exitosamente")
      this.getProductos();
    });
  }

  resetForm(): void {
    this.nuevoProducto = {
      codigo: 0,
      nombre: '',
      precio: 0,
      existencia: 0,
      idCategoria: 0,
      idMarca: 0,
      idUnidadMed: 0
    };
    this.modoEdicion = false;
    this.productoSeleccionado = {
      codigo: 0,
      nombre: '',
      precio: 0,
      existencia: 0,
      idCategoria: 0,
      idMarca: 0,
      idUnidadMed: 0
    };
  }

  // Métodos para obtener los nombres
  getCategoriaNombre(id: number): string {
    const categoria = this.categorias.find(cat => cat.idCategoria === id);
    return categoria ? categoria.nombre : 'Desconocido';
  }

  getMarcaNombre(id: number): string {
    const marca = this.marcas.find(mar => mar.idMarca === id);
    return marca ? marca.nombre : 'Desconocido';
  }

  getUnidadMedidaNombre(id: number): string {
    const unidadMedida = this.unidadesMedida.find(unidad => unidad.idUnidadMed === id);
    return unidadMedida ? unidadMedida.nombre : 'Desconocido';
  }

  /*cancelarEdicion(): void {
    this.productoSeleccionado = null;
  }*/

}

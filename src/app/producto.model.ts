export interface Producto {
    codigo: number;
    nombre: string;
    precio: number;
    existencia: number;
    idCategoria: number;
    idMarca: number;
    idUnidadMed: number;
}

export interface Categoria {
    idCategoria: number;
    nombre: string;
}

export interface Marca {
    idMarca: number;
    nombre: string;
}

export interface UnidadMedida {
    idUnidadMed: number;
    nombre: string;
}
import { ArchivoMultimediaRespuesta } from "./ArchivoMultimediaInterfaz"
import { CategoriaProductoRespuesta } from "./CategoriaProductoInterfaz"

export interface ProductoRespuesta {
    idProducto: number,
    nombreProducto: string,
    descripcionProducto: string,
    regionProducto: string,
    stockProducto: number,
    precioProducto: number,
    idUsuario: number,
    listaArchivos: ArchivoMultimediaRespuesta[],
    listaCategorias: string[],
}

export interface ProductoCreacion {
    nombreProducto: string,
    descripcionProducto: string,
    regionProducto: string,
    stockProducto: number,
    precioProducto: number,
    idUsuario: number,
    listaCategorias: number[],
}

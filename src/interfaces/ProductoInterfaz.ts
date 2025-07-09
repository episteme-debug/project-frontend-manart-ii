import { ArchivoMultimediaRespuesta } from "./ArchivoMultimediaInterfaz"

export interface ProductoRespuesta {
    idProducto: number,
    nombreProducto: string,
    descripcionProducto: string,
    descripcionDetalladaProducto: string,
    regionProducto: string,
    stockProducto: number,
    precioProducto: number,
    idUsuario: number,
    nombreUsuario: string,
    listaArchivos: ArchivoMultimediaRespuesta[],
    listaCategorias: string[],
}

export interface ProductoCreacion {
    nombreProducto: string,
    descripcionProducto: string,
    descripcionDetalladaProducto: string,
    regionProducto: string,
    stockProducto: number,
    precioProducto: number,
    idUsuario: number,
    idProducto: number,
    listaCategorias: number[]
}

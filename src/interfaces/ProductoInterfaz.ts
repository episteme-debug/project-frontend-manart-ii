import { ArchivoMultimediaRespuesta } from "./ArchivoMultimediaInterfaz"

export interface ProductoRespuesta {
    idProducto: number,
    nombreProducto: string,
    descripcionProducto: string,
    regionProducto: string,
    stockProducto: number,
    precioProducto: number,
    idUsuario: number,
    listaArchivos: ArchivoMultimediaRespuesta[]
}

import { ArchivoMultimediaRespuesta } from "./ArchivoMultimediaInterfaz";

export interface CategoriaProductoRespuesta {
    idCategoriaProducto: number,
    nombreCategoria: string,
    descripcionCategoria: string,
    estadoCategoria: boolean,
    listaArchivos: ArchivoMultimediaRespuesta[]
}
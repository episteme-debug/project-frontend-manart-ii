import { ArchivoMultimediaRespuesta } from "./ArchivoMultimediaInterfaz";

export interface CategoriaProductoRespuesta {
    idCategoria: number,
    nombreCategoria: string,
    descripcionCategoria: string,
    estadoCategoria: boolean,
    listaArchivos: ArchivoMultimediaRespuesta[]
}
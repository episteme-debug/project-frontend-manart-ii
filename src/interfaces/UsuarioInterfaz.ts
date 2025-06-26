import { ProductoRespuesta } from "./ProductoInterfaz"
import { ArchivoMultimediaRespuesta } from "./ArchivoMultimediaInterfaz"

export interface UsuarioRespuesta {
    idUsuario: number,
    alias: string,
    nombreUsuario: string,
    apellidoUsuario: string,
    emailUsuario: string,
    telefonoUsuario: string,
    estadoUsuario: boolean,
    rolUsuario: string,
    listaProductos: ProductoRespuesta[],
    listaArchivos: ArchivoMultimediaRespuesta[]
}
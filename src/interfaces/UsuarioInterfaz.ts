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
    numeroDocumentoUsuario: string,
    listaProductos: ProductoRespuesta[],
    listaArchivos: ArchivoMultimediaRespuesta[]
}

export interface UsuarioActualizacion {
    alias: string,
    nombreUsuario: string,
    apellidoUsuario: string,
    emailUsuario: string,
    telefonoUsuario: string,
    estadoUsuario: boolean,
    numeroDocumentoUsuario: string
}
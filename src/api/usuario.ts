import axios from "axios"
import React from "react"

const baseURL = "http://localhost:8080/api/usuario"
export interface UsuarioIn {
    idUsuario: number,
    alias: string,
    nombreUsuario: string,
    apellidoUsuario: string,
    emailUsuario: string,
    telefonoUsuario: string,
    estadoUsuario: boolean,
    rolUsuario: string
}

export async function obtenerUsuarioPorId() {
    const url = `${baseURL}/private/obtenerporid/1`
    const respuesta = await axios.get<UsuarioIn>(url, {withCredentials: true})
    console.log(url)
    return respuesta.data
}  
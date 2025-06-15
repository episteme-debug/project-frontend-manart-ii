"use client"
import React from "react"
import axios from "axios"
import { obtenerUsuarioPorId, UsuarioIn } from "@/api/usuario"
import { error } from "console"

export default function Usuario() {
    const [usuario, setUsuario] = React.useState<UsuarioIn | null>(null)

    React.useEffect(() => {
        async function cargarUsuario() {
            try {
                const respuesta = await obtenerUsuarioPorId()
                setUsuario(respuesta)
                console.log(respuesta)
            } catch (error: any) {
                console.error("Error inesperado:", error)
            }
        }
        cargarUsuario()
    }, [])

    if (!usuario) return <div>Cargando usuario...</div>

    return (
        <div>
            <p>{usuario.idUsuario}</p>
            <p>{usuario.alias}</p>
            <p>{usuario.nombreUsuario}</p>
            <p>{usuario.apellidoUsuario}</p>
            <p>{usuario.emailUsuario}</p>
            <p>{usuario.telefonoUsuario}</p>
            <p>{usuario.estadoUsuario}</p>
            <p>{usuario.rolUsuario}</p>
        </div>
    )
}

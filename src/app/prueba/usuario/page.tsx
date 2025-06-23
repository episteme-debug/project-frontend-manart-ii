"use client"
import { obtenerUsuarioPorId } from "@/api/Usuario"
import { UsuarioRespuesta } from "@/interfaces/UsuarioInterfaz"
import React from "react"

export default function Usuario() {
    const [usuario, setUsuario] = React.useState<UsuarioRespuesta | null>(null)

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
            {usuario.listaProductos.map(producto => (
                <div key={producto.idProducto}>
                    {producto.nombreProducto}.
                    {producto.descripcionProducto}

                    {producto.listaArchivos.map(archivo => (
                        <React.Fragment key={archivo.id}>
                            <p>{archivo.ruta}</p>
                            <img src={"http://localhost:8080/"+ archivo.ruta} alt=""/>
                        </React.Fragment>
                    ))}
                </div>
            ))}
        </div>
    )
}

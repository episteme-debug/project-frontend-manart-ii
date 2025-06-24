"use client"

import { obtenerUsuarioPorId } from "@/api/Usuario"
import { UsuarioRespuesta } from "@/interfaces/UsuarioInterfaz"
import React, { useContext } from "react"

type TipoContextoUsuario = {
  usuario: UsuarioRespuesta | null
  setUsuario: React.Dispatch<React.SetStateAction<UsuarioRespuesta | null>>
}

const ContextoUsuario = React.createContext<TipoContextoUsuario | null>(null)

export function ProveedorUsuario({ children }: { children: React.ReactNode }) {
    const [usuario, setUsuario] = React.useState<UsuarioRespuesta | null>(null)

    React.useEffect(() => {
        async function cargarUsuario() {
            try {
                const respuesta = await obtenerUsuarioPorId()
                setUsuario(respuesta)
            } catch (error: any) {
                console.error("Error inesperado:", error)
            }
        }
        cargarUsuario()
    }, [])

    return (
        <ContextoUsuario.Provider value={{ usuario, setUsuario}}>
            {children}
        </ContextoUsuario.Provider>
    )
}

export function useUsuario() {
    const contexto = useContext(ContextoUsuario)

    if(!contexto){
        throw new Error("useUusario debe ser usado dentro de un ProveedorUsuario")
    }
    return useContext(ContextoUsuario)
}
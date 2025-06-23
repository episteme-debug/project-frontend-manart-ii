"use server"

import axios from "axios"
import { UsuarioRespuesta } from "@/interfaces/UsuarioInterfaz"
import { obtenerCookie } from "@/lib/ObtencionCookie"
import { cookies } from "next/headers"

const baseURL = "http://localhost:8080/api/usuario"

export async function obtenerUsuarioPorId(): Promise<UsuarioRespuesta> {
  const user = await obtenerCookie()
  if (!user) {
    throw new Error("No autenticado")
  }

  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  const url = `${baseURL}/private/obtenerporid/${user.idUsuario}`

  const respuesta = await axios.get<UsuarioRespuesta>(url, {
    headers: {
      Cookie: `token=${token}`,
    },
  })

  return respuesta.data
}
"use server"

import { cookies } from "next/headers"
import axios from "axios"
import { obtenerCookie } from "@/lib/ObtencionCookie"

const baseURL = "http://localhost:8080/api/archivomultimedia"

export async function SubirArchivos(files: File[], entidad: string, idObjeto: number) {
  try {
    const user = await obtenerCookie()
    if (!user) throw new Error("Usuario no autenticado")

    const token = cookies().get("token")?.value
    const url = `${baseURL}/private/transferirarchivos/${entidad}/${idObjeto}`

    const formData = new FormData()
    files.forEach((file) => {
      formData.append("archivos", file) // ⬅️ nombre EXACTO que espera el backend
    })

    const response = await axios.post(url, formData, {
      headers: {
        Cookie: `token=${token}`
      },
      withCredentials: true,
    })

    return response.data
  } catch (error: any) {
    console.error("Error al subir archivos:", error.response?.data || error.message)
    return null
  }
}

"use server"

import { cookies } from "next/headers"
import axios from "axios"
import { obtenerCookie } from "@/lib/ObtencionCookie"

const baseURL = "http://localhost:8080/api/archivomultimedia"

export async function SubirArchivos(files: File[], entidad: string, idObjeto: number) {
  try {
    console.log("Dentro de subida")
    const user = await obtenerCookie()
    if (!user) throw new Error("Usuario no autenticado")

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    const url = `${baseURL}/private/transferirarchivos/${entidad}/${idObjeto}`

    const formData = new FormData()
    files.forEach((file) => {
      formData.append("archivos", file)
    })

    const response = await axios.post(url, formData, {
      headers: {
        Cookie: `token=${token}`
      }
    })

    return response.data

  } catch (error: any) {
    console.error("Error al subir archivos:", error.response?.data || error.message)
    return null

  }
}

export async function EliminarArchivo(idArchivo: number) {
  {
    try {
      const user = await obtenerCookie()
      if (!user) throw new Error("Usuario no autenticado")

      const cookieStore = await cookies()
      const token = cookieStore.get("token")?.value

      const url = `${baseURL}/private/eliminarporid/${idArchivo}`
      const peticion = await axios.delete(
        url,
        {
          headers: { Cookie: `token=${token}` }
        })

      return peticion.data

    } catch (error: any) {
      console.error("Error al eliminar el archivo", error.peticion.data || error.message)
    }
  }

}

export async function TraerArchivos(entidad:string, id:number) {
    try{
        const response = await axios.get(`http://localhost:8080/api/archivomultimedia/private/listararchivos/${entidad}/${id}`,
             {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
        )
        return response.data;
    }catch(error){
        console.error("algo salio mal al trear las imagen",error)
    }
}
"use server"

import { ProductoCreacion, ProductoRespuesta } from "@/interfaces/ProductoInterfaz";
import { obtenerCookie } from "@/lib/ObtencionCookie";
import axios from "axios";
import { error } from "console";
import { cookies } from "next/headers";

const baseURL = "http://localhost:8080/api/producto"

export async function CrearProducto(producto: ProductoCreacion): Promise<ProductoRespuesta | null> {
  try {
    console.log("Producto a crear o actualizar:", producto)

    const user = await obtenerCookie()
    if (!user) {
      throw new Error("No autenticado")
    }

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    const url = `${baseURL}/private/crear-actualizar`

    const respuesta = await axios.post<ProductoRespuesta>(url, producto, {
      headers: {
        Cookie: `token=${token}`,
      },
    })

    return respuesta.data
  } catch (error: any) {
    console.error("Error al crear producto:", error?.response?.data || error.message)
    return null
  }
}

export async function EliminarProducto(idProducto: number) {
  try {
    console.log("Id del producto a eliminar:", idProducto)

    const user = await obtenerCookie()
    if (!user) {
      throw new Error("Usuario No autenticado")
    }

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    const url = `${baseURL}/private/eliminar/${idProducto}`

    const peticion = await axios.delete(url, {
      headers: {
        Cookie: `token=${token}`
      }
    })
    return peticion.statusText

  } catch (error: any) {
    console.error("Error al eliminar el producto:", error.response.data || error.message)
    return null

  }
}
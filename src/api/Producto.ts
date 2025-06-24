"use server"

import { ProductoCreacion, ProductoRespuesta } from "@/interfaces/ProductoInterfaz";
import { obtenerCookie } from "@/lib/ObtencionCookie";
import axios from "axios";
import { cookies } from "next/headers";

const baseURL = "http://localhost:8080/api/producto"

export async function crear(producto: ProductoCreacion): Promise<ProductoRespuesta | null> {
  try {
    console.log("Producto a crear:", producto)

    const user = await obtenerCookie()
    if (!user) {
      throw new Error("No autenticado")
    }

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    const url = `${baseURL}/private/crear`

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
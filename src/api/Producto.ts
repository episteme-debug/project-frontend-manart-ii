"use server"

import { ProductoCreacion, ProductoRespuesta } from "@/interfaces/ProductoInterfaz";
import { obtenerCookie } from "@/lib/ObtencionCookie";
import axios from "axios";
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

export async function ListarProductosPorUsuario(): Promise<ProductoRespuesta[] | null> {
  try {
    const user = await obtenerCookie()
    if (!user) {
      throw new Error("No autenticado")
    }

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    const url = `${baseURL}/private/listarporusuario`

    const respuesta = await axios.get<ProductoRespuesta[]>(url, {
      headers: {
        Cookie: `token=${token}`,
      },
    })

    return respuesta.data
  } catch (error: any) {
    console.error("Error al obtener los productos:", error?.response?.data || error.message)
    return null
  }
}

// Peticiones de Edison

export async function filtrarProducto(
  nombreCategoria?: string,
  porcentajeDescuento?: number,
  precioMin?: number,
  precioMax?: number,
  region?: string
) {
  try {
    const res = await axios.get("http://localhost:8080/api/producto/public/filtrar", {
      params: {
        nombreCategoria,
        porcentajeDescuento,
        precioMin,
        precioMax,
        region
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error al traer productos:", error);
  }
}


interface Post {
  idProducto: number;
  nombreProducto: string;
  descripcionProducto: string;
  precioProducto: number;
  stockProducto: number;
  imagenProducto?: string;
}

export async function ObtenerProductos(): Promise<Post[]> {
  try {
    const response = await axios.get<Post[]>(
      "http://localhost:8080/api/producto/public/listarproductos"
    );
    return response.data;
  } catch (error) {
    console.error("erorr al obtenes los productos:", error);
    return [];
  }
}


export interface Rango {
  precioMinimo: number;
  precioMaximo: number;
}
export async function RagodePrecios(): Promise<Rango> {
  try {
    const response = await axios.get("http://localhost:8080/api/producto/public/rango-precios");
    console.log(response.data)
    return response.data; 
  } catch (error) {
    console.error("Error al obtener el rango de precios:", error);
    return {
      precioMinimo: 0,
      precioMaximo: 0,
    };
  }
}
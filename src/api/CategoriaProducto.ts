"use server"

import { CategoriaProductoRespuesta } from "@/interfaces/CategoriaProductoInterfaz"
import { obtenerCookie } from "@/lib/ObtencionCookie"
import axios from "axios"
import { cookies } from "next/headers"

const baseURL = "http://localhost:8080/api/categoriaproducto"

export async function listarCategorias(): Promise<CategoriaProductoRespuesta[]> {
    const url = `${baseURL}/public/listar`
    const respuesta = await axios.get<CategoriaProductoRespuesta[]>(url)

    return respuesta.data
}
"use server"

import { CategoriaProductoRespuesta } from "@/interfaces/CategoriaProductoInterfaz"
import axios from "axios"

const baseURL = "http://localhost:8080/api/categoriaproducto"

export async function listarCategorias(): Promise<CategoriaProductoRespuesta[]> {
    const url = `${baseURL}/public/listar`
    const respuesta = await axios.get<CategoriaProductoRespuesta[]>(url)

    return respuesta.data
}

export async function TraerArchivo(entidad:string, id:number) {
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

export interface Categoria {
  idCategoria: number;
  nombreCategoria: string;
  descripcionCategoria: string;
  estadoCategoria: true;
  archivoMultimedia: [];
}

export async function TraerCategorias(): Promise<Categoria[]> {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/categoriaproducto/public/listar",
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al traer las categorias", error);
    return [];
  }
}
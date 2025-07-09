"use server"

import { CategoriaProductoRespuesta } from "@/interfaces/CategoriaProductoInterfaz"
import axios from "axios"

const baseURL = "http://localhost:8080/api/categoriaproducto"

export async function listarCategorias(): Promise<CategoriaProductoRespuesta[]> {
  const url = `${baseURL}/public/listar`
  const respuesta = await axios.get<CategoriaProductoRespuesta[]>(url)

  return respuesta.data
}

export async function TraerArchivo(entidad: string, id: number) {
  try {
    const response = await axios.get(`http://localhost:8080/api/archivomultimedia/private/listararchivos/${entidad}/${id}`,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    )
    return response.data;
  } catch (error) {
    console.error("algo salio mal al trear las imagen", error)
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
      `${baseURL}/public/listar`,
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

export async function eliminarCategoria(idItem: number) {
  try {
    console.log(idItem);
    const response = await axios.delete(
      `${baseURL}/private/eliminar/${idItem}`,
      {
        withCredentials: true
      }
    )
    return response.data
  } catch (error: any) {
    console.log(error.response.mensaje)
    console.error("Id de la categoria", error);
  }
}

export async function crearCategoria(
  nombreCategoria: string,
  descripcionCategoria: string,
) {
  try {
    const response = await axios.post(
      `${baseURL}/private/crear`,
      {
        nombreCategoria,
        descripcionCategoria
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response;
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    throw error;
  }
}

export async function actulizarCategoria(
  id: number,
  nombreCategoria: string,
  descripcionCategoria: string,
  estadoCategoria: boolean
) {
  try {
    const respuesta = await axios.patch(
      `${baseURL}/private/actualizar/${id}`,
      {
        idCategoria: id,
        nombreCategoria,
        descripcionCategoria,
        estadoCategoria
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return respuesta;
  } catch (error) {
    console.error("Algo salio mal", error);
    return null;
  }
}

export async function obtenerPorId(id: number) {
  try {
    const response = await axios.get(`${baseURL}/public/obtenerporid/${id}`)
    return response.data;
  } catch (error) {
    console.log("Error al obtener la categoria por id", error)
    throw error
  }
}
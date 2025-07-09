"use server"

import axios from "axios"
import { UsuarioRespuesta } from "@/interfaces/UsuarioInterfaz"
import { obtenerCookie } from "@/lib/ObtencionCookie"
import { cookies } from "next/headers"



const baseURL = "http://localhost:8080/api/usuario"

export async function obtenerUsuarioPorId(): Promise<UsuarioRespuesta | null> {
  try {

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
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error)
    return null
  }
}

export async function enviarCorreo(email: string) {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/recuperar/recuperacion-contrasena/${email}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("El correo fue enviado con éxito");
  } catch (error) {
    console.error("Algo salió mal", error);
  }
}

export default async function actualizarContrasena(nuevaContrasena: string ,token:string) {
  try {
    const params = new URLSearchParams();
    params.append("token",token);
    params.append("nuevaContrasena", nuevaContrasena);

    const response = await axios.post(
      "http://localhost:8080/api/recuperar/actualizar-contrasena",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("El cambio fue exitoso");
  } catch (error) {
    console.error("Algo salió mal", error);
  }
}

export async function actualizarDatosUsuario(datosActualizacion: any): Promise<UsuarioRespuesta | null> {
  console.log("Datos a actualizar:", datosActualizacion);
  try {
    const user = await obtenerCookie()
    if (!user) {
      throw new Error("No autenticado")
    }

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    const url = `${baseURL}/private/actualizardatos/${user.idUsuario}`

    const respuesta = await axios.patch<UsuarioRespuesta>(url, datosActualizacion, {
      headers: {
        Cookie: `token=${token}`,
      },
    })

    return respuesta.data
  } catch (error) {
    console.error("Error al actualizar el usuario", error)
    return null
  }
}

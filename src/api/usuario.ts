import axios from "axios"
import { UsuarioRespuesta } from "@/interfaces/UsuarioInterfaz"

const baseURL = "http://localhost:8080/api/usuario"

export async function obtenerUsuarioPorId() {
    const url = `${baseURL}/private/obtenerporid/26`
    const respuesta = await axios.get<UsuarioRespuesta>(url, {withCredentials: true})
    console.log(url)
    return respuesta.data
}
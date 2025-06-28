import { obtenerCookie } from "@/lib/ObtencionCookie"
import axios from "axios";

export async function obtenerUsuario() {
    const usuario = await obtenerCookie();
    if (!usuario) return "No autenticado";
    console.log(usuario.idUsuario)
    try {
        const respuesta = await axios.get(
            `http://localhost:8080/api/usuario/private/obtenerporid/${usuario.idUsuario}`,
            {withCredentials: true})

            if (respuesta.status === 200) {
                return respuesta.data
            } else {
                console.log(respuesta.data)
            }

    } catch (e) {
        console.log("Error al realizar la peticion", e)
    }

}
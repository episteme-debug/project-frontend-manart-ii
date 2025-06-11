import { obtenerCookie } from "@/lib/ObtencionCookie"

export default function listarProductosUsuario() {
    const usuario = obtenerCookie()

    if (!usuario) return "No autenticado";
}
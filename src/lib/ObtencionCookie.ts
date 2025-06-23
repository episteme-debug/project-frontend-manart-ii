"use server"

import { cookies } from "next/headers"
import { jwtDecode } from "jwt-decode"

type JwtPayload = {
    emailUsuario: string;
    exp: number;
    iat: number;
    idUsuario: number;
    rolUsuario: string;
    sub: string;
}

export async function obtenerCookie() {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    try {
        const decode = jwtDecode<JwtPayload>(token);
        return {
            idUsuario: decode.idUsuario,
            nombreUsuario: decode.sub,
            rolUsuario: decode.rolUsuario,
        }
    } catch (e) {
        return null;
    }
}

export async function obtenerUsuarioAutenticado() {
    const usuario = await obtenerCookie();
    if (!usuario) {
        throw new Error("No autenticado");
    }
    return usuario;
}
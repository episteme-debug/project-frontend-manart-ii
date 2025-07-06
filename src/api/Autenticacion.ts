"use server";
import axios from "axios";
import { obtenerCookie } from "@/lib/ObtencionCookie";
import { cookies } from "next/headers";

export async function logout() {
  try {
    const user = await obtenerCookie();
    if (!user) {
      throw new Error("No autenticado");
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const response = await axios.post(
      "http://localhost:8080/api/autenticacion/public/logout",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Cookie": `token=${token}`
        },
      }
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Error al cerrar sesión:", error);
    return { 
      success: false, 
      error: error.response?.data?.mensaje || "Error al cerrar sesión" 
    };
  }
}

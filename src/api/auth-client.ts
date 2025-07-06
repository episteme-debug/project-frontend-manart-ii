import axios from "axios";

export async function logoutCliente() {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/autenticacion/public/logout",
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
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
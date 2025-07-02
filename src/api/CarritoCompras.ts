import axios from "axios";

export async function ActualizarCantidad(idItem:number , cantidadActualizada:number) {
  try {
    console.log(idItem, cantidadActualizada)
    const response = await axios.put(
      `http://localhost:8080/api/relcarritoproducto/private/actualizar-cantidad/${idItem}`,
      null,
      {
        params: {
          cantidad: cantidadActualizada
        },
         headers:{"Content-Type":"application/json" },
            withCredentials:true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Ocurrió un error:", error);
    throw error;
  }
}
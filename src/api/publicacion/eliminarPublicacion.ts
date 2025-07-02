import axios from "axios";

export async function eliminarPublicacion(idItem: number) {
  //
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/publicacion/private/eliminar/${idItem}`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("id dela categoria", error);
  }
}

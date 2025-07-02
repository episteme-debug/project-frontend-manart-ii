import axios from "axios";

export async function actulizarPublicacion(
  id: number,
  titulo: string,
  contenido: string
) {
  try {
    const respuesta = await axios.patch(
      `http://localhost:8080/api/publicacion/private/actualizar/${id}`,
      {
        titulo,
        contenido,
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

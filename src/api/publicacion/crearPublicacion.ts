import axios from "axios";

export async function crearPublicacion(
  titulo: string, 
  contenido: string,
) {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/publicacion/private/crear",
      {
        titulo,
        contenido
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, 
      }
    );
    console.log(response.data);
    return response;
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    throw error;
  }
}


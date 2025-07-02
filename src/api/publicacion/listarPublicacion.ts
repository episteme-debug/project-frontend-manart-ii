import axios from "axios";

export interface Publicacion {
  id: number;
  titulo: string;
  contenido: string;
}

export async function obtenerPublicaciones(): Promise<Publicacion[]> {
  try {
    const response = await axios.get<Publicacion[]>(
      "http://localhost:8080/api/publicacion/public/listarpublicaciones"
    );
    return response.data;
  } catch (error) {
    console.error("Ocurrió un error al obtener las publicaciones:", error);
    return [];
  }
}

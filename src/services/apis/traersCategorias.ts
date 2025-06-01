export interface Categorias {
  idCategoria: number;
  nombreCategoria: string;
  descripcionCategoria: string;
  estadoCategoria: true;
  archivoMultimedia: [];
}
import axios from "axios";
export async function traersCategorias(): Promise<Categorias[]> {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/categoriaproducto/public/obtenercategorias",
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al traer las categorias", error);
    return [];
  }
}

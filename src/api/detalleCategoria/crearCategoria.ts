import axios from "axios";

export async function crearCategoria(
  nombreCategoria: string, 
  descripcionCategoria: string,
) {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/categoriaproducto/private/crearcategoria",
      {
        nombreCategoria,
        descripcionCategoria
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, 
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    throw error;
  }
}


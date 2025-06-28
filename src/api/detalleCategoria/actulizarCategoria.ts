import axios from "axios";

export async function actulizarCategoria(
  id: number,
  nombreCategoria: string,
  descripcionCategoria: string
) {
  try {
    const respuesta = await axios.patch(
      `http://localhost:8080/api/categoriaproducto/private/actualizarcategoria/${id}`,
      {
        nombreCategoria,
        descripcionCategoria,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return respuesta.data;
  } catch (error) {
    console.error("Algo salio mal", error);
    return [];
  }
}

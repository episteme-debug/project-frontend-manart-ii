import axios from "axios";

export async function filtarCategorias(
  nombreCategoria?: string,
  porcentajeDescuento?: number,
  precioMin?: number,
  precioMax?: number
) {
  try {
    const res = await axios.get("http://localhost:8080/api/producto/public/filtar", {
      params: {
        nombreCategoria,
        porcentajeDescuento,
        precioMin,
        precioMax
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error al traer productos:", error);
  }
}

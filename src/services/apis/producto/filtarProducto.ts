import axios from "axios";

export async function filtarProducto(
  nombreCategoria?: string,
  porcentajeDescuento?: number,
  precioMin?: number,
  precioMax?: number,
  region?: String
) {
  try {
    const res = await axios.get("http://localhost:8080/api/producto/public/filtar", {
      params: {
        nombreCategoria,
        porcentajeDescuento,
        precioMin,
        precioMax,
        region
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error al traer productos:", error);
  }
}

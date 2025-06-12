import axios, { Axios } from "axios";
const api = axios.create({
  baseURL: "https://localhost:8080/api/producto/private",
  headers: {
    "Content-Type": "application/json"
  }
});
export interface Producto {
  idProducto: number;
  nombreProducto: string;
  descripcionProducto: string;
  stockProducto: number;
  precioProducto: number
  imagenProducto: string;


}
// Esta función se encarga de obtener desde el backend la lista de productos
// que corresponden a una región específica. Retorna un array de objetos Producto.
export async function listarPorRegion(region: string): Promise<Producto[]> {
  // Llamamos al cliente Axios preconfigurado para hacer una petición GET
  // al endpoint /listarporregion/{region}, donde “region” viene de la URL.
  const response = await api.get<Producto[]>(`/listarporregion/${region}`);

  // Almacenamos y devolvemos únicamente el cuerpo de la respuesta,
  // que contiene el array de productos (response.data).
  return response.data;
}


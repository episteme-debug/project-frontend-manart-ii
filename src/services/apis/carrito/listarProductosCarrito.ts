export interface Productos {
  idCarrito: number;
  idItem: number;
  idProducto: number;
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  imagenProducto: string;
}

import axios from "axios";

export async function listarproductos(): Promise<Productos[]> {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/relcarritoproducto/private/listarproductos",
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error al listar datos:", error);
    return [];
  }
}

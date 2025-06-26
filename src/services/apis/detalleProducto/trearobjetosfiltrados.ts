import React from "react";
import axios from "axios";
import CardCatalogo from "../../../components/detalleProductos/CardCatalogo";
interface Post {
  idProducto: number;
  nombreProducto: string;
  descripcionProducto: string;
  precioProducto: number;
  stockProducto: number;
}

export async function trearobjetosfiltrados(nombreCategoria: string) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/producto/public/filtar`,
      {
        params: {
          porcentajeDescuento: 30,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al filtrar productos", error);
    return [];
  }
}

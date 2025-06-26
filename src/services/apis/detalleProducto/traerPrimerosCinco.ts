import axios from "axios";
interface Productos {
  idProducto: number;
  nombreProducto: string;
  descripcionProducto: string;
  precioProducto: number;
    stockProducto: number;
}
export async function getPrimerosCinco(id:String) {
  try {
    const response = await axios.get<Productos[]>(
      `http://localhost:8080/api/producto/public/relacionados/${id}`
    );
    return response.data.slice(0, 6);
  } catch (error) {
    console.error("erorr al obtenes los productos:", error);
    return [];
  }
}

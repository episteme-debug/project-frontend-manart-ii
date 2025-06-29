import axios from "axios";
interface Post {
  idProducto: number;
  nombreProducto: string;
  descripcionProducto: string;
  precioProducto: number;
  stockProducto: number;
  imagenProducto?: String;
}

export async function obtenerPosts(): Promise<Post[]> {
  try {
    const response = await axios.get<Post[]>(
      "http://localhost:8080/api/producto/public/listarproductos"
    );
    return response.data;
  } catch (error) {
    console.error("erorr al obtenes los productos:", error);
    return [];
  }
}

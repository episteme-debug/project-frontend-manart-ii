import axios from "axios"
interface Post {
  idProducto: number;
  nombreProducto: string;
  descripcionProducto: string;
  precioProducto: number;
  stockProducto: number;
}

export async function traerPorId(id:String) {
     try {
    const res = await axios.get<Post>(
      `http://localhost:8080/api/producto/public/obtenerporid/${id}`
    );
    return res.data;
  } catch (error) {
    console.error("Error cargando producto:", error);
  }
}
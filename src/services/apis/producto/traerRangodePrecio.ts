import axios from "axios"
export interface Rango {
  precioMinimo: number;
  precioMaximo: number;
}


export async function RagodePreciso(): Promise<Rango> {
  try {
    const response = await axios.get("http://localhost:8080/api/producto/public/rango-precios");
    console.log(response.data)
    return response.data; 
  } catch (error) {
    console.error("Error al obtener el rango de precios:", error);
    return {
      precioMinimo: 0,
      precioMaximo: 0,
    };
  }
}

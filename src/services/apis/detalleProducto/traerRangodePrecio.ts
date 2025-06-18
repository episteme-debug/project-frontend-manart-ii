import axios from "axios"
 interface Rango{
    PrecioMinimo:number;
    PrecionMaximo:number
}
export async function RagodePreciso():Promise<Rango[]>  {
   try {
    const response = await axios.get("http://localhost:8080/api/producto/public/rango-precios");
    return response.data;
  } catch (error) {
    console.error("Error al obtener el rango de precios:", error);
    return [];
  }  
}
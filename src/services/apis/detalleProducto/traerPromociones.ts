export interface Promociones {
  idPromocion: number;
  nombrePromocion: string;
  porcentajeDescuentoPromocion: number;
  estadoPromocion: true;
}
import axios from "axios";
export async function traerPromociones(): Promise<Promociones[]>{
    try{
        const response = await axios.get("http://localhost:8080/api/promocion/public/listarpromociones",
            {
                headers:{"Content-Type":"application/json"},
            }
        );
        return response.data
    }catch (error){
        console.error("Error al traer las promociones", error);
        return[];
    }
}
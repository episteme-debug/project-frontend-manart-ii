import axios  from "axios";
import {listarproductos} from "./listarProductosCarrito"

export async function  eliminarproducto(idItem : number ){
    try{
        const response = await axios.delete(`http://localhost:8080/api/relcarritoproducto/private/eliminarproducto/${idItem}`,{
            headers:{"Content-Type":"application/json" },
            withCredentials:true,
        }
    );
    }catch (error){
        console.error("Id del producto no encontrado",error);
        return[]
    }
}
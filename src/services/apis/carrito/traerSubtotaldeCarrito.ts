import axios from "axios";


export async function traerSubtotal(idcarro:number){
    try{
        const response = await axios.get(`http://localhost:8080/api/carrito/private/obtenerTotal/${idcarro}`,{
             headers:{"Content-Type":"application/json" },
            withCredentials:true,
        });
        return response.data.total
    }catch (error){
        console.log("Carrito no encontrado",error)
        return 0
    }
}
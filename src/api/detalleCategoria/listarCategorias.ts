import axios from "axios";
interface Cart{
    idCategoria:number,
    nombreCategoria:String,
    descripcionCategoria:String,
    estadoCategoria :boolean
}
export async function obtenerCategorias():Promise<Cart[]> {
    try{
        const response = await axios.get<Cart[]>('http://localhost:8080/api/categoriaproducto/public/obtenercategorias')
        return response.data
    }catch (error){
        console.error("Ocurrio un error",error)
        return[];
    }
}
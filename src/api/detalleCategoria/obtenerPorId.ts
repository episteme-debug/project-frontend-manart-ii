import axios from "axios"
type Categoria = {
  idCategoria?: number
  nombreCategoria: string
  descripcionCategoria: string
  estadoCategoria?: boolean
  imagen?: string
}
export async function obtenerPorId(id: number) {
    try{
        const response = await axios.get(`http://localhost:8080/api/categoriaproducto/public/obtenercategoriaporid/${id}`)
        return response;
    }catch(error){
        throw error
    }
}
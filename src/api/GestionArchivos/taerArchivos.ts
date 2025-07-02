import axios from "axios"

export async function traerArchivo(entidad:String,id:number) {
    try{
        const response = await axios.get(`http://localhost:8080/api/archivomultimedia/private/listararchivos/${entidad}/${id}`,
             {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
        )
        return response.data;
    }catch(error){
        console.error("algo salio mal al trear las imagen",error)
    }
}
//Producto, Usuario, CategoriaProducto, Publicacion
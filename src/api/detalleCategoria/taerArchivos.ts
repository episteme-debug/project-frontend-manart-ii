import axios from "axios"

export async function traerArchivo(id:number) {
    try{
        const response = await axios.get(`http://localhost:8080/api/archivomultimedia/private/listararchivos/CategoriaProducto/${id}`,
             {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
        )
        console.log(response.data)
        return response.data;
    }catch(error){
        console.error("algo salio mal al trear las imagen",error)
    }
}
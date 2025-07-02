import axios from "axios"

export async function traerimagen(entidad:string,id:number) {
    try{
        const response = await axios.get(`http://localhost:8080/api/archivomultimedia/private/listararchivos/${entidad}/${id}`,
             {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
        )
        console.log(response.data)
        return response.data;
    }catch(error){
        console.error("Algo salio mal obtener la imagen ",error);
        return null;
    }
    
}
import axios from "axios";

export async function subirArchivo(idCategoria: number,formDataArchivo: FormData){
    const response = await axios.post(
        `http://localhost:8080/api/archivomultimedia/private/transferirarchivos/CategoriaProducto/${idCategoria}`,formDataArchivo,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      console.log(response.data)
}
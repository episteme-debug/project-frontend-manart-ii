import axios from "axios";

export async function eliminarCategoria(idItem:number){
    //
    try{
        const response = await axios.delete(`http://localhost:8080/api/categoriaproducto/private/eliminarcategoria/${idItem}`,{
            headers:{"Content-Type":"application/json" },
            withCredentials:true,
        });
        alert("se elimino correctamente");
        console.log(response.data)

    }catch(error){
        console.error("id dela categoria",error);
        return[]
    }
}
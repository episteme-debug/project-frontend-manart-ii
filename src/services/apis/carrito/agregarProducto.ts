import axios from "axios";

export async function agregarProducto(idProducto:number) {
     try {
        const cantidad:number =1
      const respuesta = await axios.post(
        `http://localhost:8080/api/relcarritoproducto/private/agregarproducto`,{
          idProducto: idProducto,
          cantidad: cantidad
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log('Respuesta:', respuesta.data);
    } catch (error) {
      console.error('Error al enviar datos', error);
    }
}
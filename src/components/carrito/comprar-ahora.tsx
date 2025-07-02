'use client'

import axios from "axios";
import { useRouter } from 'next/navigation'; // para redirigir
import { Button } from "@/components/ui/button";

type id = {
  idProducto: number;
};

export default function ComprarAhora({ idProducto }: id) {
  const router = useRouter();

  const agregarCarrito = async () => {
    try {
      const datos = {
        idProducto: idProducto,
        cantidad: 1,
      };

      const respuesta = await axios.post(
        'http://localhost:8080/api/relcarritoproducto/private/agregarproducto',
        datos,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      console.log('Respuesta:', respuesta.data);
      alert("Producto agregado con éxito");

      router.push('/carrito');  
    } catch (error) {
      console.log('Error al enviar datos', error);
      alert("Error al agregar el producto");
    }
  };

  return (
    <Button onClick={agregarCarrito} variant="outline" className="mr-5 ml-5">
      Comprar ahora
    </Button>
  );
}

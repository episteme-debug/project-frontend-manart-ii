"use client"
import axios from "axios";
import { Button } from "@/components/ui/button";

type Props = {
    idProducto :number
}

export default function ActivarBoton({ idProducto }:Props) {
  const agregarCarrito = async () => {
    try 
    {
      const datos = {
        idProducto: idProducto,
        cantidad: 1
      }
      const respuesta = await axios.post(
        'http://localhost:8080/api/relcarritoproducto/private/agregarproducto',
        datos,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      console.log('Respuesta:', respuesta.data)
      alert("Producto agregado con exito");
    } catch (error) {
      console.log('Error al enviar datos', error)
    }
  }

  return (
    <Button onClick={agregarCarrito}variant="outline" className="mr-5 ml-5">
      Agregar al carrito
    </Button>
  )
}

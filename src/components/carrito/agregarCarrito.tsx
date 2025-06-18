"use client"
import axios from "axios";
import { Button } from "@/components/ui/button";
import { agregarProducto } from "../../services/apis/carrito/agregarProducto"
type Props = {
    idProducto :number
}

export default function ActivarBoton({ idProducto }:Props) {
  const agregarCarrito = async () => {
     try{
       await agregarProducto(idProducto)
     }catch{
       
     }
   };

  return (
    <Button onClick={agregarCarrito}variant="outline" className="mr-5 ml-5">
      Agregar al carrito
    </Button>
  )
}

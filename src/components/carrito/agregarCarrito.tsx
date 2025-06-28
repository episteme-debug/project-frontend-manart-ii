"use client"
import axios from "axios";
import { Button } from "@/components/ui/button";
import { agregarProducto } from "../../services/apis/carrito/agregarProducto"
import { useToast } from "@/hooks/use-toast"
type Props = {
  idProducto: number
}

export default function ActivarBoton({ idProducto }: Props) {
  const { toast } = useToast()
  const agregarCarrito = async () => {
    try {
      await agregarProducto(idProducto),
        toast({
          title: (<div className="flex border-b-1 border-b-green-400 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
            <span> Proceso Exitoso</span>
          </div>),
          description: "Se agregó al carrito correctamente",
          duration: 4000,
          variant: "default",
        })
    } catch {
      toast({
        title: "Algo salio mal",
        description: "No se puedo agregar al carrito",
      })
    }
  };

  return (
    <Button onClick={agregarCarrito} variant="outline" className="mr-5 ml-5">
      Agregar al carrito
    </Button>
  )
}

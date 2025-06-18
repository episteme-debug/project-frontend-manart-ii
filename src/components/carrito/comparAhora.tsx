'use client'

import axios from "axios";
import { useRouter } from 'next/navigation'; 
import { Button } from "@/components/ui/button";
import { agregarProducto } from "../../services/apis/carrito/agregarProducto"
type id = {
  idProducto: number;
};

export default function ComparaAhora({ idProducto }: id) {
  const router = useRouter();

  const agregarCarrito = async () => {
    try{
      await agregarProducto(idProducto)
       router.push('/carrito');  
    }catch{

    }
  };

  return (
    <Button onClick={agregarCarrito} variant="outline" className="mr-5 ml-5">
      Comprar ahora
    </Button>
  );
}

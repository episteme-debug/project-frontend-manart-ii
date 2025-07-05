"use client"

import axios from "axios";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { useCarrito } from '@/contexts/CarritoContext';
import { useState, useCallback } from 'react';

type id = {
  idProducto: number;
};

export default function AgregarCarrito({ idProducto }: id) {
  const { actualizarCarrito } = useCarrito();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const agregarCarrito = useCallback(async () => {
    if (isProcessing) return; // Evitar múltiples clics
    
    setIsProcessing(true);
    setIsSuccess(false);
    
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
      
      // Actualizar el contexto del carrito después de agregar el producto
      await actualizarCarrito();
      
      // Mostrar éxito brevemente
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
      
    } catch (error) {
      console.log('Error al enviar datos', error);
    } finally {
      setIsProcessing(false);
    }
  }, [idProducto, actualizarCarrito, isProcessing]);

  return (
    <Button 
      onClick={agregarCarrito}
      disabled={isProcessing}
      className={`w-full font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0 group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
        isSuccess 
          ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white' 
          : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white'
      }`}
    >
      <div className="flex items-center justify-center gap-3">
        {isProcessing ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        ) : isSuccess ? (
          <Check className="w-5 h-5" />
        ) : (
          <ShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
        )}
        <span className="text-lg">
          {isProcessing ? 'Agregando...' : isSuccess ? '¡Agregado!' : 'Agregar al Carrito'}
        </span>
      </div>
    </Button>
  );
}

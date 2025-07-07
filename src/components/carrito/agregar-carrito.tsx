"use client"

import axios from "axios";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCarrito } from '@/contexts/CarritoContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useState, useCallback } from 'react';

type id = {
  idProducto: number;
};

export default function AgregarCarrito({ idProducto }: id) {
  const { actualizarCarrito } = useCarrito();
  const { isAuthenticated, showAuthRequired } = useAuth();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const agregarCarrito = useCallback(async () => {
    if (isProcessing) return; // Evitar múltiples clics
    
    // Verificar si el usuario está autenticado
    if (!isAuthenticated) {
      showAuthRequired("cart");
      return;
    }
    
    setIsProcessing(true);
    
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
      
      // Mostrar toast de éxito
      toast({
        title: "¡Producto agregado!",
        description: "El producto se ha agregado exitosamente a tu carrito.",
        variant: "default",
      });
      
    } catch (error) {
      console.log('Error al enviar datos', error);
      
      // Mostrar toast de error
      toast({
        title: "Error",
        description: "No se pudo agregar el producto al carrito. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [idProducto, actualizarCarrito, isProcessing, toast]);

  return (
    <Button 
      onClick={agregarCarrito}
      disabled={isProcessing}
      className="w-full font-medium py-3 px-6 rounded-xl shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-300 border border-slate-200 hover:border-slate-300 group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none bg-gradient-to-r from-slate-50 to-gray-50 hover:from-slate-100 hover:to-gray-100 text-slate-700"
    >
      <div className="flex items-center justify-center gap-2">
        {isProcessing ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-600"></div>
        ) : (
          <ShoppingCart className="w-4 h-4 text-slate-600" />
        )}
        <span className="text-base">
          {isProcessing ? 'Agregando...' : 'Agregar al Carrito'}
        </span>
      </div>
    </Button>
  );
}

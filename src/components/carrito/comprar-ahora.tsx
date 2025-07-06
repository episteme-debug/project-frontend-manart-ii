'use client'

import axios from "axios";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight } from "lucide-react";
import { useCarrito } from '@/contexts/CarritoContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useState, useCallback } from 'react';

type id = {
  idProducto: number;
};

export default function ComprarAhora({ idProducto }: id) {
  const router = useRouter();
  const { actualizarCarrito } = useCarrito();
  const { isAuthenticated, showAuthRequired } = useAuth();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const agregarCarrito = useCallback(async () => {
    if (isProcessing) return; // Evitar múltiples clics
    
    // Verificar si el usuario está autenticado
    if (!isAuthenticated) {
      showAuthRequired("purchase");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const datos = {
        idProducto: idProducto,
        cantidad: 1,
      };

      // Iniciar navegación inmediatamente
      router.push('/carrito');

      // Procesar en segundo plano
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
      
      // Mostrar toast de confirmación
      toast({
        title: "¡Producto agregado!",
        description: "El producto se ha agregado a tu carrito y estás siendo redirigido.",
        variant: "default",
      });
      
    } catch (error) {
      console.log('Error al enviar datos', error);
      
      // Mostrar toast de error
      toast({
        title: "Error",
        description: "No se pudo procesar la compra. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [idProducto, router, actualizarCarrito, isProcessing, toast]);

  return (
    <Button 
      onClick={agregarCarrito}
      disabled={isProcessing}
      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0 group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
      <div className="flex items-center justify-center gap-3">
        {isProcessing ? (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        ) : (
          <Zap className="w-6 h-6 group-hover:animate-pulse" />
        )}
        <span className="text-lg">
          {isProcessing ? 'Procesando...' : 'Comprar Ahora'}
        </span>
        {!isProcessing && (
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        )}
      </div>
    </Button>
  );
}

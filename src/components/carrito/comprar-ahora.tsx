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
      className="w-full bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-amber-800 font-medium py-3 px-6 rounded-xl shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-300 border border-amber-200 hover:border-amber-300 group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
      <div className="flex items-center justify-center gap-2">
        {isProcessing ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600"></div>
        ) : (
          <Zap className="w-4 h-4 text-amber-600" />
        )}
        <span className="text-base">
          {isProcessing ? 'Procesando...' : 'Comprar Ahora'}
        </span>
        {!isProcessing && (
          <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-0.5 transition-transform duration-300" />
        )}
      </div>
    </Button>
  );
}

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { listarproductos } from '@/services/apis/carrito/listarProductosCarrito';

interface ProductoCarrito {
  idCarrito: number;
  idItem: number;
  idProducto: number;
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  imagenProducto: string;
}

interface CarritoContextType {
  productos: ProductoCarrito[];
  cantidadTotal: number;
  isLoading: boolean;
  error: string | null;
  cargarCarrito: () => Promise<void>;
  actualizarCarrito: () => Promise<void>;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [productos, setProductos] = useState<ProductoCarrito[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargarCarrito = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const productosCarrito = await listarproductos();
      setProductos(productosCarrito);
    } catch (err) {
      setError('Error al cargar el carrito');
      console.error('Error cargando carrito:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const actualizarCarrito = async () => {
    await cargarCarrito();
  };

  // Calcular cantidad total de productos
  const cantidadTotal = productos.reduce((total, producto) => total + producto.cantidad, 0);

  // Cargar carrito al montar el componente
  useEffect(() => {
    cargarCarrito();
  }, []);

  const value: CarritoContextType = {
    productos,
    cantidadTotal,
    isLoading,
    error,
    cargarCarrito,
    actualizarCarrito
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const context = useContext(CarritoContext);
  if (context === undefined) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
} 
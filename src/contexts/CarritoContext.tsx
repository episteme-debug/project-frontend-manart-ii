"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { listarproductos } from '@/services/apis/carrito/listarProductosCarrito';
import { useAuth } from './AuthContext';

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
  limpiarCarrito: () => void;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [productos, setProductos] = useState<ProductoCarrito[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const cargarCarrito = async () => {
    // Solo cargar carrito si hay sesión activa
    if (!isAuthenticated) {
      setProductos([]);
      setError(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const productosCarrito = await listarproductos();
      
      // Asegurar que siempre sea un array
      if (Array.isArray(productosCarrito)) {
        setProductos(productosCarrito);
      } else {
        console.error('La respuesta no es un array:', productosCarrito);
        setProductos([]);
      }
    } catch (err: any) {
      console.error('Error cargando carrito:', err);
      
      // Si hay error de autenticación (401) o cualquier otro error, limpiar carrito
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        setError('Sesión expirada. Por favor, inicia sesión nuevamente.');
      } else {
        setError('Error al cargar el carrito');
      }
      
      setProductos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const actualizarCarrito = async () => {
    await cargarCarrito();
  };

  const limpiarCarrito = () => {
    setProductos([]);
    setError(null);
  };

  // Calcular cantidad total de productos
  const cantidadTotal = productos.reduce((total, producto) => total + producto.cantidad, 0);

  // Cargar carrito cuando cambie el estado de autenticación
  useEffect(() => {
    if (isAuthenticated) {
      cargarCarrito();
    } else {
      // Limpiar carrito cuando no hay sesión
      limpiarCarrito();
    }
  }, [isAuthenticated]);

  const value: CarritoContextType = {
    productos,
    cantidadTotal,
    isLoading,
    error,
    cargarCarrito,
    actualizarCarrito,
    limpiarCarrito
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
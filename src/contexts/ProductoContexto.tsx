"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { ProductoRespuesta } from '@/interfaces/ProductoInterfaz';
import { ObtenerProductos } from '@/api/Producto';

interface ProductoContextType {
  productos: ProductoRespuesta[];
  productosFiltrados: ProductoRespuesta[];
  terminoBusqueda: string;
  setTerminoBusqueda: (termino: string) => void;
  isLoading: boolean;
  error: string | null;
  cargarProductos: () => Promise<void>;
  preloadProductos: () => Promise<void>;
}

const ProductoContext = createContext<ProductoContextType | undefined>(undefined);

export function ProductoProvider({ children }: { children: ReactNode }) {
  const [productos, setProductos] = useState<ProductoRespuesta[]>([]);
  const [productosFiltrados, setProductosFiltrados] = useState<ProductoRespuesta[]>([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Memoizar la función de filtrado para evitar recálculos innecesarios
  const filtrarProductos = useCallback((productos: ProductoRespuesta[], termino: string) => {
    if (!termino.trim()) {
      return productos;
    }

    const terminoLower = termino.toLowerCase().trim();
    return productos.filter(producto => 
      producto.nombreProducto.toLowerCase().includes(terminoLower) ||
      producto.descripcionProducto.toLowerCase().includes(terminoLower) ||
      producto.regionProducto.toLowerCase().includes(terminoLower) ||
      producto.listaCategorias.some(categoria => 
        categoria.toLowerCase().includes(terminoLower)
      )
    );
  }, []);

  // Memoizar productos filtrados
  const productosFiltradosMemo = useMemo(() => {
    return filtrarProductos(productos, terminoBusqueda);
  }, [productos, terminoBusqueda, filtrarProductos]);

  const cargarProductos = useCallback(async () => {
    if (isLoading) return; // Evitar múltiples llamadas simultáneas
    
    try {
      setIsLoading(true);
      setError(null);
      const productosObtenidos = await ObtenerProductos();
      setProductos(productosObtenidos);
      setProductosFiltrados(productosObtenidos);
      setIsInitialized(true);
    } catch (err) {
      setError('Error al cargar los productos');
      console.error('Error cargando productos:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  // Función para precarga en segundo plano
  const preloadProductos = useCallback(async () => {
    if (isInitialized) return;
    
    try {
      const productosObtenidos = await ObtenerProductos();
      setProductos(productosObtenidos);
      setProductosFiltrados(productosObtenidos);
      setIsInitialized(true);
    } catch (err) {
      console.error('Error en precarga de productos:', err);
    }
  }, [isInitialized]);

  // Actualizar productos filtrados cuando cambie el memo
  useEffect(() => {
    setProductosFiltrados(productosFiltradosMemo);
  }, [productosFiltradosMemo]);

  // Precarga de productos al montar el componente
  useEffect(() => {
    preloadProductos();
  }, [preloadProductos]);

  const value: ProductoContextType = {
    productos,
    productosFiltrados,
    terminoBusqueda,
    setTerminoBusqueda,
    isLoading,
    error,
    cargarProductos,
    preloadProductos
  };

  return (
    <ProductoContext.Provider value={value}>
      {children}
    </ProductoContext.Provider>
  );
}

export function useProductos() {
  const context = useContext(ProductoContext);
  if (context === undefined) {
    throw new Error('useProductos debe ser usado dentro de un ProductoProvider');
  }
  return context;
}
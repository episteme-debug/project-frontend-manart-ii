"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { use } from 'react';
import CardCatalogo from '@/components/product/card-catalogo';
import { useProductos } from '@/contexts/ProductoContexto';
import { TraerCategorias } from '@/api/CategoriaProducto';
import { TraerPromociones } from '@/api/Promocion';
import { RagodePrecios } from '@/api/Producto';

interface Props {
  searchParams?: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default function CatalogoProducto({ searchParams }: Props) {
  const resolvedSearchParams = searchParams ? use(searchParams) : { page: '1' };
  const page = parseInt(resolvedSearchParams?.page || '1', 10);
  const limit = 15;
  const searchParamsHook = useSearchParams();
  const searchFromURL = searchParamsHook.get('search');

  const { productos, productosFiltrados, setTerminoBusqueda, isLoading } = useProductos();

  // Sincronizar búsqueda desde URL con el contexto
  useEffect(() => {
    if (searchFromURL) {
      setTerminoBusqueda(searchFromURL);
    }
  }, [searchFromURL, setTerminoBusqueda]);

  // Usar productos filtrados si hay búsqueda, sino usar todos los productos
  const postsToShow = searchFromURL ? productosFiltrados : productos;

  const totalPages = Math.ceil(postsToShow.length / limit);
  const startIndex = (page - 1) * limit;
  const currentPosts = postsToShow.slice(startIndex, startIndex + limit);

  // Cargar categorías y promociones (esto se puede optimizar más adelante)
  const [categorias, setCategorias] = useState<any[]>([]);
  const [promociones, setPromociones] = useState<any[]>([]);
  const [rango, setRango] = useState({ precioMinimo: 0, precioMaximo: 0 });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [cats, proms, rang] = await Promise.all([
          TraerCategorias(),
          TraerPromociones(),
          RagodePrecios()
        ]);
        setCategorias(cats);
        setPromociones(proms);
        setRango(rang);
      } catch (error) {
        console.error('Error cargando datos del catálogo:', error);
      }
    };
    cargarDatos();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <CardCatalogo
      posts={currentPosts}
      page={page}
      totalPages={totalPages}
      categorias={categorias}
      promociones={promociones}
      rango={rango}
    />
  );
}
"use client"
import { useEffect, useState } from 'react';
import { traersCategorias } from "../services/apis/traersCategorias";
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"

interface Categoria {
  idCategoria: number;
  nombreCategoria: string;
  descripcionCategoria: string;
  estadoCategoria: boolean;
  archivoMultimedia: any[]; 
}

function TraertodasLascategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    traersCategorias()
      .then((data) => setCategorias(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando categorías...</p>;

  return (
    <div>
      <h2>Lista de Categorías</h2>
      <ul>
        {categorias.map((categoria) => (
          <div key={categoria.idCategoria}>
            <Checkbox />{categoria.nombreCategoria}
           </div>
        ))}
      </ul>
    </div>
  );
}

export default TraertodasLascategorias;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { InputOTPSeparator } from "@/components/ui/input-otp";

interface PrecioRangoFiltroProps {
  setprecioMin: (valor: number) => void;
  setprecioMax: (valor: number) => void;
  inhabilitar: (valor: boolean) => void;
  habilitar: (valor: boolean) => void;
  Ocultra: (valor: boolean) => void;
}

export default function PrecioRangoFiltro({
  setprecioMin,
  setprecioMax,
  inhabilitar,
  habilitar,
  Ocultra,
}: PrecioRangoFiltroProps) {
  const [valormini, setvalormini] = useState(0);
  const [valormax, setvalormax] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8080/api/producto/public/rango-precios')
      .then(response => {
        const data = response.data;
        setvalormini(data.precioMinimo);
        setvalormax(data.precioMaximo);
      })
      .catch(error => {
        console.error('Error al obtener el rango de precios:', error);
      });
  }, []);

  return (
    <div className=''>
      <label className='m-2 text-2xl'>Precio</label>
      <div className='ml-2 mr-2 flex'>
        <input
          type="number"
          name="cantidadMinima"
          id="minimo"
          className='border-2 w-[45%] m'
          placeholder="Minimo"
          value={valormini}
          onChange={(e) => setvalormini(Number(e.target.value))}
        />
        <InputOTPSeparator />
        <input
          type="number"
          name="cantidadMaxima"
          id="maximo"
          className='border-2 w-[45%]'
          placeholder="Maximo"
          value={valormax}
          onChange={(e) => setvalormax(Number(e.target.value))}
        />
      </div>
      <div>
        <Button
          variant="outline"
          className='ml-2 mt-1'
          onClick={() => {
            setprecioMin(valormini);
            setprecioMax(valormax);
            inhabilitar(false);
            habilitar(false);
            Ocultra(false);
          }}
        >
          Filtrar
        </Button>
      </div>
    </div>
  );
}

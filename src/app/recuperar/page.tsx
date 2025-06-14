'use client';

import React from 'react';
import Image from 'next/image';
import RecoverForm  from '@/components/RecoverForm';

export default function RecoverPage() {
  return (
    <main className="relative min-h-screen bg-gray-50 flex items-center justify-center">
      {/* 1. Contenedor flex centrado, con posición relativa */}

      <div className="absolute inset-0">
        <Image
          src="/images/20250525_2145_Playa Colombiana Minimalista_simple_compose_01jw57hzaxegj8kt4kaw2q7x3k.png"
          alt="Paisaje colombiano"
          fill
          className="object-cover brightness-75"
        />
      </div>
      {/* 2. Imagen de fondo que cubre todo y se oscurece un poco */}

      <RecoverForm />
      {/* 3. Formulario encima de la imagen (z-10 en su contenedor) */}
    </main>
  );
}

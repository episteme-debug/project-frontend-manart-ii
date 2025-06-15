'use client';
import React from 'react';
import LoginForm from '@/components/LoginForm';
//Componente de formulario de login
import Image from 'next/image';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex">
      {/* 4. min-h-screen ocupa toda la altura de la ventana
            flex crea un contenedor en fila para colocar imagen + formulario */}
      {/* Zona izquierda: la imagen */}
      <div className='hidden md:block md:w-5xl relative'>
        {/*  hidden: no mostrar en móviles (pantallas <768px).
             md:block: a partir de pantallas medianas lo mostramos como bloque.
             md:w-1/2: ocupa la mitad del ancho en md+.
             relative: permite que el hijo <Image fill> se posicione correctamente. */}
        fill
        {/* 8. Hace que la imagen cubra TODO el contenedor padre (position absolute). */}
        <Image
          src="/images/20250524_0005_Esencia Artesanal Colombiana_simple_compose_01jw0atdk4enz99a026d093km2.png"
          alt="Ilustración de bienvenida a ManArt"
          fill
          className="object-cover"
        />
        {/* object-cover ajusta la proporción de la imagen para no deformarse,
            recortando los lados si es necesario */}
      </div>
      <div className='w-full md: w-1/2 bg-white min-h-screen p-8'>
        <LoginForm />
      </div>
    </main>

  );
}

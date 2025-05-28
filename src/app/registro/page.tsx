'use client'
import { redirect } from "next/navigation";
import React from 'react';
import Image from 'next/image';
import RegisterForm from '@/components/RegisterForm';
export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex">
      {/*  min-h-screen: ocupa toda la altura de la ventana.
            bg-gray-100: fondo gris claro para toda la página.
            flex: contenedor en fila (flex-row) para dos columnas. */}
      {/* === Columna Izquierda: Formulario === */}
      <div className="md: w-1/2 justify-center bg-white min-h-screen p-8">
        {/* 
              md:w-1/2: en pantallas medianas y grandes ocupa 50 %.
              p-8: padding interior de 1.5 rem para separar del borde. */}
        <RegisterForm />

      </div>
      {/* === Columna Derecha: Imagen === */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="/images/20250523_2319_Paisaje Colombiano con Artesanía_simple_compose_01jw08620gfrhtxec35dgvmhwy.png"
          alt="Artesanías del Eje Cafetero"
          fill
          // fill: convierte la imagen en posición absoluta ocupando TODO el tamaño del padre.
          className="object-cover"
        // object-cover: escala y recorta la imagen para llenar el área sin deformar su proporción.
        />
      </div>


    </main>

  );
}

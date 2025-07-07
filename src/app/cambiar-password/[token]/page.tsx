import React from 'react'
import NuevaPassword from '@/components/autenticacion/nueva-password'
import Image from 'next/image';

function page({ params }: { params: { token: string } })  {
  return (
    <main className="relative min-h-screen bg-gray-50 flex items-center justify-center">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <Image
          src="/images/20250525_2145_Playa Colombiana Minimalista_simple_compose_01jw57hzaxegj8kt4kaw2q7x3k.png"
          alt="Paisaje colombiano"
          fill
          className="object-cover brightness-75"
        />
      </div>

      {/* Formulario centrado */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <NuevaPassword token={params.token} />
      </div>
    </main>
  )
}

export default page
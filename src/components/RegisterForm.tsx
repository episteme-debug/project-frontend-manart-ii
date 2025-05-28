'use client';
import React from 'react';
import useRegister from "@/api/useRegister";

export default function RegisterForm() {
  const {
    alias,
    setAlias,
    nombreUsuario,
    setNombreUsuario,
    apellidoUsuario,
    setApellidoUsuario,
    emailUsuario,
    setEmailUsuario,
    contrasenaUsuario,
    setContrasenaUsuario,
    telefonoUsuario,
    setTelefonoUsuario,
    imagenPerfilUsuario,
    setImagenPerfilUsuario,
    manejarEnvio,
    mensaje
  } = useRegister();
  return (
    <div className='flex flex-col justify-center h-full bg-white p-8 rounded-lg'>
      <div className='w-full max-w-md mx-auto'>
        <h2 className="text-2xl font-bold mb-6 text-center text-[#334E68] ">
          ¡Qué bueno verte, bienvenido!
        </h2>
        {/* 8. Título:
              - text-2xl: tamaño de texto ~1.5rem.
              - font-bold: negrita.
              - mb-6: margen inferior de 1.5rem.
              - text-center: centrado horizontal. */}
        <form onSubmit={manejarEnvio} className='space-y-4'>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Alias
            </label>
            <input type="text"
              className='t-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#789262]'
              value={alias}
              onChange={e => setAlias(e.target.value)}
              required
            />
          </div>
          {/* Nombre de usuario */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#789262]"
              value={nombreUsuario}
              onChange={e => setNombreUsuario(e.target.value)}
              required
            />
          </div>

          {/* Apellido de usuario */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#789262]"
              value={apellidoUsuario}
              onChange={e => setApellidoUsuario(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"                  // 6. type=email para validación básica
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#789262]"
              value={emailUsuario}
              onChange={e => setEmailUsuario(e.target.value)}
              required
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="tel"                    // 7. type=tel para formato de teléfono
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#789262]"
              value={telefonoUsuario}
              onChange={e => setTelefonoUsuario(e.target.value)}
              required
            />
          </div>


          {/* Contraseña */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Contraseña
            </label>
            <input type="text"
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#789262"
            onChange={contrasenaUsuario} 
            onRateChange={e=>setContrasenaUsuario(e.target.value)}
            required
            />
          </div>

          {/* Botón de registro */}
          <button
            type="submit"
            className="w-full bg-[#C57B4A] text-white py-2 rounded-md hover:bg-[#D9915F]-700 transition"
          >
            Registrarme
          </button>
        </form>
        {/* Mensaje de retroalimentación */}
        {mensaje && (
          <p className="mt-4 text-center text-red-600">
            {mensaje}
          </p>
        )}

      </div>
    </div>



  );

}
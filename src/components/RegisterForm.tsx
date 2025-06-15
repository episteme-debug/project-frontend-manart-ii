"use client";
import React from "react";
import useRegister from "@/api/useRegister";

export default function RegisterForm() {
  const [mostrarContrasena, setMostrarContrasena] = React.useState(false);
  const AlternarVisible = () => {
    setMostrarContrasena((prev) => !prev);

  }
  const {
    alias,
    setAlias,
    nombreUsuario,
    setNombreUsuario,
    apellidoUsuario,
    setApellidoUsuario,
    emailUsuario,
    setEmailUsuario,
    telefonoUsuario,
    setTelefonoUsuario,
    hashContrasenaUsuario,
    setHashContrasenaUsuario,
    rolUsuario,
    setRolUsuario,
    manejarEnvio,
    mensaje,
  } = useRegister();
  return (
    <div className="flex flex-col justify-center h-full bg-white p-8 rounded-lg">
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#334E68] ">
          ¡Qué bueno verte, bienvenido!
        </h2>
        <p className="flex text-sm items-center text-center mb-6 text-[#5A4C42] font-serif italic ">Sé parte del parche que le pone alma, barro y madera a la historia.</p>
        {/* 8. Título:
              - text-2xl: tamaño de texto ~1.5rem.
              - font-bold: negrita.
              - mb-6: margen inferior de 1.5rem.
              - text-center: centrado horizontal. */}
        <form onSubmit={manejarEnvio} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Alias
            </label>
            <input
              type="text"
              className="t-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#789262] text-black"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
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
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#789262] text-black"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
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
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#789262] text-black"
              value={apellidoUsuario}
              onChange={(e) => setApellidoUsuario(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email" // 6. type=email para validación básica
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#789262] text-black"
              value={emailUsuario}
              onChange={(e) => setEmailUsuario(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Telefono
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border rounded-md
            focus:outline-none focus:ring-2 focus:ring-[#789262] text-black"
              value={telefonoUsuario}
              onChange={(e) => setTelefonoUsuario(e.target.value)}
              required
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
          </div>
          <div className='relative'>
            <input
              type={mostrarContrasena ? 'text' : 'password'}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm border-[#C4B6A6] text-black"
              value={hashContrasenaUsuario}
              onChange={(e) => setHashContrasenaUsuario(e.target.value)}
              required
            />
            <button
              type='button'
              onClick={AlternarVisible}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-[#b57944] hover:text-[#C57B4A]">
              {mostrarContrasena ? (
                // Ícono de "ojo tachado"

                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-6-10-6a17.5 17.5 0 014.247-4.969M9.878 9.879A3 3 0 0114.121 14.12M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                </svg>
              ) : (
                // Ícono de "ojo abierto"
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}

            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rol usuario
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border rounded-md
            focus:outline-none focus:ring-2 focus:ring-[#789262] text-black"
              value={rolUsuario}
              onChange={(e) => setRolUsuario(e.target.value)}
              required
            />
          </div>
          <div className="text-right mt-5">
            <a className="text-sm text-[#D9915F]" href="/login">¿Ya tienes una cuenta amigo/a?</a>
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
        {mensaje && <p className="mt-4 text-center text-red-600">{mensaje}</p>}
      </div>
    </div>
  );
}
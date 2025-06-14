'use client';
import { useLogin } from '@/api/login';
import SocialOptions from './SocialLogin'; // Asegúrate de que la ruta sea correcta
import { useState } from 'react';

export default function FormularioLogin() {

    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const {
        usuario,
        setUsuario,
        contrasena,
        setContrasena,
        mensaje,
        manejarEnvio
    } = useLogin();

    const AlternarVisibilidad = () => {
        setMostrarContrasena(prev => !prev);
    }

    return (
        <div className="flex flex-col justify-center h-full bg-gray-50 p-8 rounded-lg ">
            {/* flex-col + justify-center centra verticalmente */}
            <div className="w-full  mx-auto">
                {/* max-w-md para no hacerlo gigantesco; quita mt-20 */}

                <h2 className="text-2xl font-bold mb-4 text-center text-[#4B3F32]">
                    Inicio de sesión
                </h2>

                {/* Descripción pequeña y con serif para un aire más clásico */}
                <p className="text-sm font-serif italic leading-snug mb-6 text-center text-[#5A4C42]">
                    Explora otra vez lo mejor de nuestra tradición artesanal.
                </p>

                <form onSubmit={manejarEnvio} className="space-y-4">
                    <div>
                        <div className="flex items-center text-sm font-medium text-[#7D7461] mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#b57944] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9.99 9.99 0 0112 15c2.21 0 4.243.714 5.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <label>Usuario</label>
                        </div>

                        <input
                            type="text"
                            className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#C4B6A6]"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            required
                        />
                    </div>


                    <div>
                        <div className='flex items-center text-sm font-medium text-[#7D7461] mb-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#b57944] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m4-6V9a4 4 0 10-8 0v2m12 0H4v10h16V11z" />
                            </svg>

                            <label >Contraseña</label>
                        </div>

                        <div className='relative'>
                            <input
                                type={mostrarContrasena ? 'text' : 'password'}
                                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm border-[#C4B6A6]"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                required
                            />
                            <button
                                type='button'
                                onClick={AlternarVisibilidad}
                                className='absolute inset-y-0 right-0 flex items-center px-3 text-[#b57944] hover:text-[#C57B4A}'>
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

                    </div>
                    <div className="mt-1 flex w-full">
                        <div className="w-1/2 text-left">
                            <a href="/registro" className="text-sm text-[#789262] hover:underline">
                                ¿No tienes cuenta?
                            </a>
                        </div>
                        <div className="w-1/2 text-right">
                            <a href="/recuperar" className="text-sm text-[#789262] hover:underline">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-[#D9915F] hover:bg-[#C57B4A] text-white py-2 rounded-md  transition"
                    >
                        Iniciar sesión
                    </button>

                </form>

                <div className='w-full max-w-xl mx-auto space-y-4'>
                    <SocialOptions />
                </div>
                <div className="mt-4 text-center">
                    {mensaje && <p className="mt-4 text-center text-red-600 w-full break-words">{mensaje}</p>}
                </div>
            </div>
        </div>
    );
}

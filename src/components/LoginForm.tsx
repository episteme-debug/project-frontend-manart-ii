'use client';
import { useLogin } from '@/api/login';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import SocialOptions from './SocialLogin';

export default function FormularioLogin() {
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const {
        usuario,
        setUsuario,
        contrasena,
        setContrasena,
        isLoading,
        manejarEnvio
    } = useLogin();

    const AlternarVisibilidad = () => {
        setMostrarContrasena(prev => !prev);
    }

    return (
        <div className="flex flex-col justify-center h-full bg-gradient-to-br from-[#FFFCEC] to-[#FFF9DC] p-8 rounded-lg shadow-xl border border-yellow-200">
            <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2 text-amber-900">
                        Bienvenido de vuelta
                    </h2>
                    <p className="text-amber-700">
                        Inicia sesión para continuar explorando nuestra artesanía
                    </p>
                </div>

                <form onSubmit={manejarEnvio} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-amber-800 mb-2">
                            Usuario
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors bg-white/80"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            required
                            disabled={isLoading}
                            placeholder="Ingresa tu usuario"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-amber-800 mb-2">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={mostrarContrasena ? 'text' : 'password'}
                                className="w-full px-4 py-3 pr-12 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors bg-white/80"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                required
                                disabled={isLoading}
                                placeholder="Ingresa tu contraseña"
                            />
                            <button
                                type='button'
                                onClick={AlternarVisibilidad}
                                className='absolute inset-y-0 right-0 flex items-center px-3 text-amber-500 hover:text-amber-700 transition-colors'
                                disabled={isLoading}
                            >
                                {mostrarContrasena ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <Link 
                            href="/registro" 
                            className="text-amber-700 hover:text-amber-900 transition-colors font-medium"
                        >
                            ¿No tienes cuenta?
                        </Link>
                        <Link 
                            href="/cambiar-password" 
                            className="text-amber-700 hover:text-amber-900 transition-colors font-medium"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:bg-gradient-to-r hover:from-white hover:to-gray-50 hover:text-amber-600 hover:border-2 hover:border-amber-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-500 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Iniciando sesión...
                            </>
                        ) : (
                            'Iniciar sesión'
                        )}
                    </button>
                </form>

                <div className="mt-8">
                    <SocialOptions />
                </div>
            </div>
        </div>
    );
}

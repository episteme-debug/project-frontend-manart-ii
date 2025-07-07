'use client';
import React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import actualizarContrasena from '@/api/Usuario';
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

function NuevaPassword({ token }: { token: string }) {
    const [nuevaContrasena, setNuevaContrasena] = useState("");
    const [confirmacion, setConfirmacion] = useState("");
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const enviar = async () => {
        if (!token) {
            toast({
                title: "Token inválido",
                description: "El enlace de recuperación no es válido. Solicita uno nuevo",
                variant: "destructive",
            });
            return;
        }

        if (nuevaContrasena !== confirmacion) {
            toast({
                title: "Contraseñas no coinciden",
                description: "Asegúrate de que ambas contraseñas sean iguales",
                variant: "destructive",
            });
            return;
        }

        if (nuevaContrasena.length < 6) {
            toast({
                title: "Contraseña muy corta",
                description: "La contraseña debe tener al menos 6 caracteres",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            await actualizarContrasena(nuevaContrasena, token);
            
            toast({
                title: "¡Contraseña actualizada exitosamente!",
                description: "Serás redirigido al inicio de sesión en unos segundos",
                variant: "default",
            });
            
            // Limpiar formulario
            setNuevaContrasena("");
            setConfirmacion("");
            
            // Redirigir después de 2 segundos
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (error) {
            toast({
                title: "Error al actualizar contraseña",
                description: "No se pudo actualizar la contraseña. Verifica tu conexión e intenta de nuevo",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col justify-center h-full bg-gradient-to-br from-[#FFFCEC] to-[#FFF9DC] p-8 rounded-lg shadow-xl border border-yellow-200">
            <div className="w-full max-w-md mx-auto">
                {/* Logo */}
                <div className="text-center mb-6">
                    <Image
                        src="/logo.png"
                        alt="Logo ManArt"
                        width={200}
                        height={80}
                        className="mx-auto mb-4"
                    />
                </div>

                {/* Título y descripción */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2 text-amber-900">
                        Nueva Contraseña
                    </h2>
                    <p className="text-amber-700">
                        Crea una nueva contraseña segura para tu cuenta
                    </p>
                </div>

                {/* Formulario */}
                <form onSubmit={(e) => { e.preventDefault(); enviar(); }} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-amber-800 mb-2">
                            Nueva Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={mostrarContrasena ? 'text' : 'password'}
                                className="w-full px-4 py-3 pl-12 pr-12 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors bg-white/80"
                                value={nuevaContrasena}
                                onChange={(e) => setNuevaContrasena(e.target.value)}
                                placeholder="Ingresa tu nueva contraseña"
                                required
                                disabled={isLoading}
                                minLength={6}
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 w-5 h-5" />
                            <button
                                type="button"
                                onClick={() => setMostrarContrasena(!mostrarContrasena)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-500 hover:text-amber-700 transition-colors"
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

                    <div>
                        <label className="block text-sm font-medium text-amber-800 mb-2">
                            Confirmar Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={mostrarConfirmacion ? 'text' : 'password'}
                                className="w-full px-4 py-3 pl-12 pr-12 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors bg-white/80"
                                value={confirmacion}
                                onChange={(e) => setConfirmacion(e.target.value)}
                                placeholder="Confirma tu nueva contraseña"
                                required
                                disabled={isLoading}
                                minLength={6}
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 w-5 h-5" />
                            <button
                                type="button"
                                onClick={() => setMostrarConfirmacion(!mostrarConfirmacion)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-500 hover:text-amber-700 transition-colors"
                                disabled={isLoading}
                            >
                                {mostrarConfirmacion ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Validación de contraseñas */}
                    {nuevaContrasena && confirmacion && (
                        <div className={`p-3 rounded-lg text-sm ${
                            nuevaContrasena === confirmacion && nuevaContrasena.length >= 6
                                ? "bg-green-100 text-green-800 border border-green-200"
                                : "bg-red-100 text-red-800 border border-red-200"
                        }`}>
                            {nuevaContrasena === confirmacion && nuevaContrasena.length >= 6 ? (
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Las contraseñas coinciden
                                </div>
                            ) : (
                                <div>
                                    {nuevaContrasena !== confirmacion && "Las contraseñas no coinciden"}
                                    {nuevaContrasena.length < 6 && nuevaContrasena === confirmacion && "La contraseña debe tener al menos 6 caracteres"}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Botón de actualización */}
                    <button
                        type="submit"
                        disabled={isLoading || nuevaContrasena !== confirmacion || nuevaContrasena.length < 6}
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:bg-gradient-to-r hover:from-white hover:to-gray-50 hover:text-amber-600 hover:border-2 hover:border-amber-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-500 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Actualizando contraseña...
                            </>
                        ) : (
                            <>
                                <Lock className="w-5 h-5" />
                                Actualizar contraseña
                            </>
                        )}
                    </button>
                </form>

                {/* Enlaces de navegación */}
                <div className="mt-8 text-center">
                    <Link 
                        href="/login" 
                        className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 transition-colors font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver al inicio de sesión
                    </Link>
                </div>

                {/* Información de seguridad */}
                <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-sm text-amber-800 text-center">
                        Tu nueva contraseña debe tener al menos 6 caracteres para mayor seguridad.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NuevaPassword
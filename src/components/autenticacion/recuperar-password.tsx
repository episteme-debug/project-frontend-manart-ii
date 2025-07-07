'use client';
import React, { useState } from 'react'
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { enviarCorreo } from '@/api/Usuario';
import { Mail, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function RecuperarPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const enviar = async () => {
    if (!email || !email.includes("@")) {
      toast({
        title: "Correo inválido",
        description: "Por favor ingresa un correo electrónico válido",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await enviarCorreo(email);
      toast({
        title: "¡Correo enviado exitosamente!",
        description: "Revisa tu bandeja de entrada para continuar con la recuperación de tu contraseña",
        variant: "default",
      });
      
      // Limpiar el formulario después del envío exitoso
      setEmail("");
    } catch (error) {
      toast({
        title: "Error al enviar correo",
        description: "No se pudo enviar el correo. Verifica tu conexión e intenta de nuevo",
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
            Recuperar Contraseña
          </h2>
          <p className="text-amber-700">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={(e) => { e.preventDefault(); enviar(); }} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-amber-800 mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              <input
                type="email"
                className="w-full px-4 py-3 pl-12 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors bg-white/80"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tú@correo.com"
                required
                disabled={isLoading}
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 w-5 h-5" />
            </div>
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:bg-gradient-to-r hover:from-white hover:to-gray-50 hover:text-amber-600 hover:border-2 hover:border-amber-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-500 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Enviando correo...
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                Enviar correo de recuperación
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

        {/* Información adicional */}
        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-sm text-amber-800 text-center">
            ¿No recibiste el correo? Revisa tu carpeta de spam o solicita uno nuevo.
          </p>
        </div>
      </div>
    </div>
  )
}
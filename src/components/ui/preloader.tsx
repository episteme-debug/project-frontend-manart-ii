"use client"

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface PreloaderProps {
  isVisible: boolean;
  message?: string;
}

export function Preloader({ isVisible, message = "Cargando..." }: PreloaderProps) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Delay para evitar parpadeos
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  );
}

// Hook para manejar el estado de carga global
export function usePreloader() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Cargando...");

  const showLoader = (msg?: string) => {
    if (msg) setMessage(msg);
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  return {
    isLoading,
    message,
    showLoader,
    hideLoader
  };
} 
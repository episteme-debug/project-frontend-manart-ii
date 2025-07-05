"use client"

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

interface NavigationOptions {
  showLoader?: boolean;
  loaderMessage?: string;
  preload?: boolean;
}

export function useOptimizedNavigation() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const navigateTo = useCallback(async (
    path: string, 
    options: NavigationOptions = {}
  ) => {
    if (isNavigating) return; // Evitar múltiples navegaciones simultáneas
    
    const { showLoader = false, loaderMessage = "Navegando...", preload = true } = options;
    
    setIsNavigating(true);
    
    try {
      // Si se solicita preload, intentar precargar la página
      if (preload) {
        try {
          // Prefetch de Next.js para precargar la página
          router.prefetch(path);
        } catch (error) {
          console.warn('Error en prefetch:', error);
        }
      }

      // Navegación inmediata
      router.push(path);
      
    } catch (error) {
      console.error('Error en navegación:', error);
    } finally {
      // Resetear estado después de un breve delay
      setTimeout(() => setIsNavigating(false), 100);
    }
  }, [isNavigating, router]);

  const navigateWithLoader = useCallback(async (
    path: string, 
    loaderMessage?: string
  ) => {
    return navigateTo(path, { 
      showLoader: true, 
      loaderMessage: loaderMessage || "Cargando..." 
    });
  }, [navigateTo]);

  const navigateSilently = useCallback(async (path: string) => {
    return navigateTo(path, { showLoader: false, preload: false });
  }, [navigateTo]);

  return {
    navigateTo,
    navigateWithLoader,
    navigateSilently,
    isNavigating
  };
} 
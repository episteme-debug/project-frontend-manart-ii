import { useAuth } from '@/contexts/AuthContext';
import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';

export function useAuthCheck() {
  const { setUser, isAuthenticated } = useAuth();

  useEffect(() => {
    const verificarAutenticacion = async () => {
      // Solo verificar si no está autenticado
      if (isAuthenticated) return;

      try {
        const respuesta = await axios.get('http://localhost:8080/api/usuario/private/cargar-usuario', {
          withCredentials: true,
        });

        if (respuesta.status === 200 && respuesta.data) {
          const datosUsuario = respuesta.data;
          setUser({
            id: datosUsuario.idUsuario || 0,
            nombre: datosUsuario.nombreUsuario || datosUsuario.alias || '',
            email: datosUsuario.emailUsuario || '',
            rol: datosUsuario.rolUsuario || 'usuario'
          });
          console.log('Usuario autenticado:', datosUsuario);
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 400 && axiosError.response?.data === 'Sin sesión') {
          setUser(null);
          console.log('No hay sesión activa');
        } else {
          console.log('Error al verificar autenticación:', axiosError.message);
          setUser(null);
        }
      }
    };

    verificarAutenticacion();
  }, [setUser, isAuthenticated]);
} 
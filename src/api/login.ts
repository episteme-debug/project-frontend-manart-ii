import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export function useLogin() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { setUser } = useAuth();

  const manejarEnvio = async (evento: React.FormEvent) => {
    evento.preventDefault();
    setIsLoading(true);
    
    console.log("Enviando datos de inicio de sesión:", { usuario, contrasena });

    try {
      const respuesta = await axios.post(
        "http://localhost:8080/api/autenticacion/public/login",
        {
          alias: usuario,
          contraseña: contrasena,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (respuesta.status === 200) {
        // Extraer información del usuario de la respuesta
        const userData = respuesta.data;
        const user = {
          id: userData.id || 0,
          nombre: userData.nombre || userData.alias || usuario,
          email: userData.email || "",
          rol: userData.rol || "usuario"
        };

        toast({
          title: "¡Inicio de sesión exitoso!",
          description: `Bienvenido de vuelta, ${user.nombre}`,
          variant: "default",
        });
        
        // Limpiar formulario
        setUsuario("");
        setContrasena("");
        
        // Actualizar estado de autenticación con información del usuario
        setUser(user);
        
        // Redirigir al inicio después de un breve delay
        setTimeout(() => {
          router.push("/home");
        }, 1000);
      }
    } catch (error: any) {
      console.error("Error en login:", error);
      
      let errorMessage = "Error al iniciar sesión";
      
      if (error.response?.data?.mensaje) {
        errorMessage = error.response.data.mensaje;
      } else if (error.response?.status === 401) {
        errorMessage = "Usuario o contraseña incorrectos";
      } else if (error.response?.status === 404) {
        errorMessage = "Usuario no encontrado";
      } else if (error.code === "NETWORK_ERROR") {
        errorMessage = "Error de conexión. Verifica tu internet";
      }
      
      toast({
        title: "Error de autenticación",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    usuario,
    setUsuario,
    contrasena,
    setContrasena,
    isLoading,
    manejarEnvio,
  };
}

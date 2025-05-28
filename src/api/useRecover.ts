'use client';
import { useState } from "react";
import axios from "axios";

export default function useRecover(){
    // Estado para el email que el usuario escribe
    const [email, setEmail] = useState("");
    // Semáforo de flujo: 'idle' | 'sending' | 'sent' | 'error'
    const [status, setStatus]= useState<'idle' |'sending'|'error'|'sent'>('idle');
    // Mensaje de feedback (éxito o error)
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus('sending');
      setMensaje('');
      try {
        // Enviamos la petición POST con Axios a nuestra API
        const response = await axios.post('/api/auth/recover', { email }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Si el servidor respondió con éxito (2xx), cambiamos de estado
        if (response.status === 200) {
          setStatus('sent');
          setMensaje('¡Revisa tu correo para restablecer la contraseña!')
        } else {
          throw new Error('Respuesta inesperada');
        }
      } catch (error) {
        // En caso de fallo (error de red, 4xx o 5xx), marcamos error
        setStatus('error');
        setMensaje('No pudimos enviar el correo. Intenta de nuevo.');
      }
    }
    return{
      email,
      setEmail,
      status,
      setStatus,
      mensaje,
      handleSubmit
      
    }



}
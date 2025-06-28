import { useState } from 'react';
import axios from 'axios';

export function useLogin() {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mensaje, setMensaje] = useState('');

    const manejarEnvio = async (evento: React.FormEvent) => {
        evento.preventDefault();
        console.log('Enviando datos de inicio de sesión:', { usuario, contrasena });
        try {
            const respuesta = await axios.post('http://localhost:8080/api/autenticacion/public/login', {
                alias: usuario,
                contraseña: contrasena,
            },
            {withCredentials: true});

            if (respuesta.status === 200) {
                setMensaje('Inicio de sesión exitoso\n' + respuesta.data.mensaje);

            }
        } catch (error: any) {
            setMensaje('Error al iniciar sesión');
        }
    };

    return {
        usuario,
        setUsuario,
        contrasena,
        setContrasena,
        mensaje,
        manejarEnvio
    };
}

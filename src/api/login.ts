import { useState } from 'react';
import axios from 'axios';

export function useLogin() {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mensaje, setMensaje] = useState('');

    const manejarEnvio = async (evento: React.FormEvent) => {
        evento.preventDefault();

        try {
            const respuesta = await axios.post('/api/autenticacion/public/login', {
                alias: usuario,
                contraseña: contrasena,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (respuesta.status === 200) {
                setMensaje('Inicio de sesión exitoso\n' + respuesta.data.token);
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

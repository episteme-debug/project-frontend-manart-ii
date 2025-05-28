'use client';
import { useState } from 'react'
import axios from 'axios'


export default function useRegister() {
  //  Cada campo de la entidad Spring necesita su propio estado:

  const [alias, setAlias] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [apellidoUsuario, setApellidoUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [contrasenaUsuario, setContrasenaUsuario] = useState('');
  const [telefonoUsuario, setTelefonoUsuario] = useState('');
  //  El campo imagenPerfilUsuario tiene un valor por defecto:
  const [imagenPerfilUsuario, setImagenPerfilUsuario] = useState('avatarGenerico.jpg');
  // 3. Un estado para mostrar mensajes de error o éxito:
  const [mensaje, setMensaje] = useState('');

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();

    setMensaje('')
    try {
      const respuesta = await axios.post('api/registro', {
        alias,
        nombreUsuario,
        apellidoUsuario,
        emailUsuario,
        contrasenaUsuario,
        telefonoUsuario,
        imagenPerfilUsuario
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (respuesta.status === 200) {
        setMensaje('Registro exitoso. ¡Bienvenido, ' + nombreUsuario + '!');

      }
      else {
        setMensaje('Algo salió mal al registrar.');
      }
    }
    catch (error: any) {
      // 10. Captura cualquier error de red o validación y lo muestra
      setMensaje(error.response?.data?.message || 'Error en el registro');
    }
  }
  return {
    alias,
    setAlias,
    nombreUsuario,
    setNombreUsuario,
    apellidoUsuario,
    setApellidoUsuario,
    emailUsuario,
    setEmailUsuario,
    contrasenaUsuario,
    setContrasenaUsuario,
    telefonoUsuario,
    setTelefonoUsuario,
    imagenPerfilUsuario,
    setImagenPerfilUsuario,
    mensaje,
    manejarEnvio

  }

} 
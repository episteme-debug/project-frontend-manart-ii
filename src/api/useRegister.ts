import { useState } from 'react'
import axios from 'axios'


export default function useRegister() {
  //  Cada campo de la entidad Spring necesita su propio estado:

  const [alias, setAlias] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [apellidoUsuario, setApellidoUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [telefonoUsuario, setTelefonoUsuario] = useState('');
  const [hashContrasenaUsuario, setHashContrasenaUsuario] = useState('');
  const [rolUsuario, setRolUsuario] = useState('');
  // Un estado para mostrar mensajes de error o éxito:
  const [mensaje, setMensaje] = useState('');

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();

    setMensaje('')
    try {
      const respuesta = await axios.post('http://localhost:8080/api/autenticacion/public/registro', {
        alias,
        nombreUsuario,
        apellidoUsuario,
        emailUsuario,
        telefonoUsuario,
        hashContrasenaUsuario,
        rolUsuario,
      }, {
        withCredentials: true,
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
      console.error('Error registrando usuario:', error);

      const status = error.response?.status;
      const responseData = error.response?.data;
      console.error(responseData);

      setMensaje(responseData?.message || 'Error en el registro');
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
    telefonoUsuario,
    setTelefonoUsuario,
    hashContrasenaUsuario,
    setHashContrasenaUsuario,
    rolUsuario,
    setRolUsuario,
    mensaje,
    manejarEnvio

  }

}
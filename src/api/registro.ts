import { useState } from 'react'
import axios from 'axios'


export default function useRegister() {
  //  Cada campo de la entidad Spring necesita su propio estado:

  const [alias, setAlias] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [apellidoUsuario, setApellidoUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [telefonoUsuario, setTelefonoUsuario] = useState('');
  const [numeroDocumentoUsuario, setNumeroDocumentoUsuario] = useState('');
  const [hashContrasenaUsuario, setHashContrasenaUsuario] = useState('');
  const [rolUsuario, setRolUsuario] = useState('COMPRADOR'); // Por defecto, el rol es COMPRADOR
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
        numeroDocumentoUsuario,
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
      if (!rolUsuario) {
        setMensaje("Debes elegir un rol válido.");
        return;
      }

    }
    catch (error: any) {
      console.error("📡 Error registrando usuario:", error);

      if (error.response) {
        console.error("→ status:", error.response.status);
        console.error("→ data:", error.response.data);
        console.error("→ headers:", error.response.headers);
        // Axios no provee response.text(), así que:
        console.error("→ raw response body:", JSON.stringify(error.response.data, null, 2));
        console.log("📤 Cuerpo de registro:", {
          alias, nombreUsuario, numeroDocumentoUsuario,
          apellidoUsuario, emailUsuario, telefonoUsuario,
          hashContrasenaUsuario, rolUsuario
        });
      }

      setMensaje("Error en registro: revisa la consola para más detalles.");
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
    numeroDocumentoUsuario,
    setNumeroDocumentoUsuario,
    hashContrasenaUsuario,
    setHashContrasenaUsuario,
    rolUsuario,
    setRolUsuario,
    mensaje,
    manejarEnvio

  }

}
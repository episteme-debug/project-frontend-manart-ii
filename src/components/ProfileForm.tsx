'use client'
import { profile } from "console";
import React, { useState } from "react";


//TypeScript usa esta interfaz para validar que form tenga exactamente estas propiedades.
export interface profileData {
  alias: string;
  nombreUsuario: string;
  apellidoUsuario: string;
  emailUsuario: string;
  telefonoUsuario: string;
  hashContrasenaUsuario: string;
  numeroDocumentoUsuario: string;
  ciudadUsuario: string;
}
interface profileFormProps {
  initialData?: profileData;// llena el formulario si ya hay datos guardados.
  onSubmit: (data: profileData) => Promise<void>;//función que se llamará al enviar, recibiendo los datos.
}

//Pasa datos y comportamiento desde la página padre.
export function ProfileForm({ initialData, onSubmit }: profileFormProps) {

  const [form, setForm] = useState<profileData>(
    initialData ?? {
      alias: "",
      nombreUsuario: "",
      apellidoUsuario: "",
      emailUsuario: "",
      telefonoUsuario: "",
      hashContrasenaUsuario: "",
      numeroDocumentoUsuario: "",
      ciudadUsuario: "",
    }
  );//Declaramos un estado form con useState.

  const [mensaje, setMensaje] = useState<string>("");//Mensaje de error o éxito.
  //Esta funcion escomo un asistente que sabe exactamente qué campo del formulario estás completando y actualiza solo ese, sin tocar los demá
  // Esta función actualiza el estado del formulario cuando escribes en los campos
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({
      ...prev, // Mantiene todos los valores anteriores del formulario
      [e.target.name]: e.target.value // Actualiza SOLO el campo que estás editando
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMensaje("")
    try {
      await onSubmit(form); // Llama a la función onSubmit con los datos del formulario
      setMensaje("Operacion exitosa");
    } catch (err: any) {
      setMensaje(err.message || "Error");

    }
  }
  return (
    //  Renderiza un formulario y asocia handleSubmit al evento onSubmit
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">


      {/*  Recorre todas las entradas del objeto `form` (alias, nombreUsuario, etc.) */}
      {Object.entries(form).map(([Key, value]) => (
        <div key={Key} className="flex flex-col">
          {/* 4️⃣ El <label> muestra el nombre del campo y se asocia al input con htmlFor */}
          <label htmlFor={Key} className="font-medium">
            {Key}
          </label>
          {/* 5️⃣ El <input>:
              - id/name = key (permite que handleChange identifique qué campo cambió)
              - value   = valor actual en el estado form[key]
              - onChange= handleChange para actualizar el estado
              - estilos básicos con Tailwind */}
          <input
            id={Key}
            name={Key}
            value={value}
            onChange={handleChange}
            className="border px-2 py-1 rounded" />
        </div>
      ))
      }

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Guardar
      </button>

      {mensaje && <p className="mt-2">{mensaje}</p>}
    </form>
  )
}
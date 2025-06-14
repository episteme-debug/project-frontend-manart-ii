'use client';

import React from 'react';
import useRecover from '@/api/useRecover';

export default function RecoverForm() {
  const {
    email,
    setEmail,
    status,
    handleSubmit,
    mensaje
  } = useRecover();

  return (
    <div
      className="
        relative            /* Posiciona este div sobre la imagen de fondo */
        bg-white            /* Fondo blanco puro */
        bg-opacity-80       /* 80% de opacidad para dejar traslucidez */
        backdrop-blur-md    /* Aplica desenfoque al fondo detrás de este div */
        rounded-xl          /* Esquinas redondeadas (extra large) */
        p-8                 /* Padding interno de 2rem (8 * 0.25rem) */
        w-full              /* Ocupa 100% del ancho de su contenedor */
        max-w-md            /* Ancho máximo igual a 28rem */
        z-10                /* Z-index alto para estar encima de otros elementos */
      "
    >
      <h1
        className="
          text-2xl            /* Tamaño de texto: ~1.5rem */
          font-semibold       /* Peso de fuente seminegrita */
          text-[#4B3F32]      /* Color café oscuro mediante código hexadecimal */
          mb-4                /* Margin-bottom: 1rem */
          text-center         /* Centra el texto horizontalmente */
        "
      >
        ¿Olvidaste tu contraseña?
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"     /* Añade 1rem de espacio vertical entre cada elemento hijo */
      >
        <div>
          <label
            className="
              block              /* Display block para ocupar todo el ancho */
              text-sm            /* Tamaño de texto pequeño */
              text-[#7D7461]     /* Color topo suave */
              mb-1               /* Margin-bottom: 0.25rem */
            "
          >
            Correo Electrónico
          </label>

          <input
            type="email"
            required
            placeholder="tú@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'sending'}  /* Mientras status sea 'sending', deshabilita el input */
            className="
              w-full              /* Ancho completo del contenedor */
              px-4 py-2           /* Padding horizontal de 1rem y vertical de 0.5rem */
              border border-[#C4B6A6] /* Borde del input con color topo */
              rounded-md          /* Bordes redondeados medianos */
              shadow-sm           /* Sombra sutil para dar profundidad */
              focus:outline-none  /* Quita outline por defecto al enfocar */
              text-[#4B3F32]      /* Color del texto café oscuro */
              focus:ring-2        /* Ancho del anillo de foco: 2px */
              focus:ring-[#789262]/* Color del anillo de foco: verde musgo */
              mb-5
            "
          />

          <button
            type="submit"
            disabled={status === 'sending'}
            className="
              w-full                    /* Botón de ancho completo */
              bg-[#D9915F]              /* Fondo en color terracota moderado */
              hover:bg-[#C57B4A]        /* Cambio a terracota más intenso al pasar el mouse */
              text-white                /* Texto blanco para buen contraste */
              py-2                      /* Padding vertical: 0.5rem */
              rounded-md                /* Bordes redondeados */
              transition                /* Transición suave en los cambios de estado */
              disabled:opacity-50       /* Opacidad reducida cuando está deshabilitado */
            "
          >
            {status === 'sending' ? 'Enviando...' : 'Enviar correo de recuperación'}
          </button>
        </div>
      </form>

      {mensaje && (
        <p
          className={`
            mt-4                    /* Margin-top: 1rem */
            text-center            /* Texto centrado */
            ${status === 'sent'
              ? 'text-green-600'    /* Si status es 'sent', texto en verde */
              : 'text-red-600'      /* En cualquier otro caso (error), texto en rojo */
            }
          `}
        >
          {mensaje}  {/* Mostramos el mensaje de feedback (éxito o error) */}
        </p>
      )}
    </div>
  );
}

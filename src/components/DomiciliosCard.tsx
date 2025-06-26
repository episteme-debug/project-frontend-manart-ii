interface props {
  direccion: string;
  ciudad: string;
  nombre: string;
}
export function DomiciliosCard({ direccion, ciudad, nombre }: props) {
  return (
    // <article> = bloque independiente de contenido
    <article className="bg-white rounded-lg shadow-md p-6 relative">
      {/* 2. Icono “casa” en posición absoluta */}

      {/* Texto: desplazado a la derecha del icono */}
      <div className="m1-12">
        <h2 className="text-lg text-gray-900 font-medium">{direccion}</h2>
        <p className="text-sm text-gray-700">{ciudad}</p>
        <p className="text-sm text-gray-700">{nombre}</p>
      </div>
      {/* 4. Acción “Editar” dentro de <footer> semántico */}
      <footer className="mt-4">
        <button className="text-teal-600 hover:text-teal-700 hover:underline text-sm">
          Agregar datos y domicilios
        </button>
      </footer>
    </article>

  )

}
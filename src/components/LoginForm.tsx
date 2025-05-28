'use client';
import { useLogin } from '@/api/login';

export default function FormularioLogin() {
    const {
        usuario,
        setUsuario,
        contrasena,
        setContrasena,
        mensaje,
        manejarEnvio
    } = useLogin();

    return (
        <div className="flex flex-col justify-center h-full bg-gray-50 p-8 rounded-lg ">
            {/* flex-col + justify-center centra verticalmente */}
            <div className="w-full max-w-md mx-auto">
                {/* max-w-md para no hacerlo gigantesco; quita mt-20 */}

   <h2 className="text-2xl font-bold mb-4 text-center text-[#4B3F32]">
          Inicio de sesión
        </h2>

        {/* Descripción pequeña y con serif para un aire más clásico */}
        <p className="text-sm font-serif italic leading-snug mb-6 text-center text-[#5A4C42]">
          Explora otra vez lo mejor de nuestra tradición artesanal.
        </p>

                <form onSubmit={manejarEnvio} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium 	text-[#7D7461]">Usuario</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm border-[#C4B6A6]"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium 	text-[#7D7461]">Contraseña</label>
                        <input
                            type="password"
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm border-[#C4B6A6]"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mt-1 text-right'>
                        <a href="/recuperar"
                            className='text-sm text-[#789262] hover:underline'>¿Olvidaste tu contraseña?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#D9915F] hover:bg-[#C57B4A] text-white py-2 rounded-md  transition"
                    >
                        Iniciar sesión
                    </button>
                </form>
                <div className="mt-4 text-center">
                    {mensaje && <p className="mt-4 text-center text-red-600 w-full break-words">{mensaje}</p>}
                </div>
            </div>
        </div>
    );
}

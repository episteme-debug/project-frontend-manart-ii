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
        <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
            <form onSubmit={manejarEnvio} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Usuario</label>
                    <input
                        type="text"
                        className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input
                        type="password"
                        className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Iniciar sesión
                </button>
            </form>
            <div className="mt-4 text-center">
                {mensaje && <p className="mt-4 text-center text-red-600 w-full break-words">{mensaje}</p>}
            </div>
        </div>
    );
}

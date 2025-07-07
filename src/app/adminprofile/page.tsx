'use client';

import Image from "next/image";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from 'axios';
import { Usuario } from "@/types/usuario";

export default function AdminProfilePage() {
  // Hook para navegación programática
  const router = useRouter();
  // Obtiene el parámetro 'id' de la URL para saber qué usuario cargar/editar
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");

  // Estado local para almacenar datos de usuario y mensajes de error/éxito
  const [user, setUser] = useState<Usuario | null>(null);
  const [form, setForm] = useState<Usuario>({} as Usuario);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  //  Efecto inicial: obtener datos del usuario por ID
  useEffect(() => {
    if (!idParam) {
      setErrorMsg("No se proporcionó el ID de usuario.");
      setLoading(false);
      return;
    }

    async function fetchUser() {
      try {
        // Llamada GET al endpoint Spring Boot
        const url = `http://localhost:8080/api/usuario/private/obtenerporid/${idParam}`;
        const response = await axios.get<Usuario>(url, { withCredentials: true });
        setUser(response.data);           // Guarda datos para mostrar
        setForm(response.data);           // Inicializa formulario con los mismos datos
      } catch (err: any) {
        console.error("❌ Error cargando perfil:", err);
        setErrorMsg("Hubo un problema cargando tu perfil.");
      } finally {
        setLoading(false);                // Oculta indicador de carga
      }
    }

    fetchUser();
  }, [idParam]);

  //  handleChange: sincroniza inputs con el estado 'form'
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value } as Usuario));
  }

  //  handleSubmit: envía cambios al backend via PATCH
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (!idParam) throw new Error("ID de usuario no definido.");
      // Construye payload según DTO ActualizacionUsuario
      const payload: any = {
        nombre: form.nombreUsuario,
        apellido: form.apellidoUsuario,
        email: form.emailUsuario,
        telefono: form.telefonoUsuario,
        numeroDocumento: form.numeroDocumentoUsuario
      };
      // Si el usuario quiere cambiar la contraseña, la agrega
      if (form.hashContrasenaUsuario) {
        payload.hashContrasena = form.hashContrasenaUsuario;
      }

      // Llamada PATCH al endpoint de Spring Boot
      const url = `http://localhost:8080/api/usuario/private/actualizardatos/${idParam}`;
      await axios.patch(url, payload, { withCredentials: true });

      setSuccessMsg("Perfil actualizado correctamente.");
      setEditing(false);                  // Sale del modo edición
      // Opcional: recargar datos desde el backend para ver cambios
      setLoading(true);
      const refreshed = await axios.get<Usuario>(url.replace('actualizardatos', 'obtenerporid'), { withCredentials: true });
      setUser(refreshed.data);
      setForm(refreshed.data);
      setLoading(false);
    } catch (err: any) {
      console.error("❌ Error actualizando perfil:", err);
      setErrorMsg(err.response?.data || err.message);
    }
  }

  //  Render de loading
  if (loading) {
    return (
      <div className="flex h-screen">
        <aside className="w-64 bg-white border-r">
          <AppSidebar />
        </aside>
        <main className="flex-1 flex items-center justify-center">
          <p>Cargando perfil…</p>
        </main>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 h-screen bg-gray-100">
      {/* Sidebar fijo */}
      <SidebarProvider>
        <aside className="w-64 bg-white border-r">
          <AppSidebar />
        </aside>
      </SidebarProvider>

      <main className="overflow-y-auto p-8 bg-gray-50">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {editing ? 'Editar Perfil' : 'Perfil del Administrador'}
          </h1>

          {/* Muestra mensaje de error o éxito */}
          {errorMsg && <p className="text-red-600">{errorMsg}</p>}
          {successMsg && <p className="text-green-600">{successMsg}</p>}

          {/* Si está en modo edición, muestra formulario; si no, muestra vista */}
          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Avatar y alias (no editable) */}
              <div className="flex items-center space-x-4">
                <Image
                  src="/images/default-avatar.png"
                  width={80} height={80}
                  className="rounded-full border"
                  alt="Avatar"
                />
                <p className="text-xl font-semibold">@{form.alias}</p>
              </div>

              {/* Campos editables: nombre y apellido */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nombreUsuario" className="block font-medium">Nombre</label>
                  <input
                    id="nombreUsuario" name="nombreUsuario"
                    value={form.nombreUsuario} onChange={handleChange}
                    className="mt-1 block w-full border rounded px-2 py-1" required
                  />
                </div>
                <div>
                  <label htmlFor="apellidoUsuario" className="block font-medium">Apellido</label>
                  <input
                    id="apellidoUsuario" name="apellidoUsuario"
                    value={form.apellidoUsuario} onChange={handleChange}
                    className="mt-1 block w-full border rounded px-2 py-1" required
                  />
                </div>
              </div>

              {/* Email, teléfono y documento */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="emailUsuario" className="block font-medium">Email</label>
                  <input id="emailUsuario" type="email" name="emailUsuario"
                    value={form.emailUsuario} onChange={handleChange}
                    className="mt-1 block w-full border rounded px-2 py-1" required
                  />
                </div>
                <div>
                  <label htmlFor="telefonoUsuario" className="block font-medium">Teléfono</label>
                  <input id="telefonoUsuario" name="telefonoUsuario"
                    value={form.telefonoUsuario} onChange={handleChange}
                    className="mt-1 block w-full border rounded px-2 py-1" required
                  />
                </div>
                <div>
                  <label htmlFor="numeroDocumentoUsuario" className="block font-medium">Documento</label>
                  <input id="numeroDocumentoUsuario" name="numeroDocumentoUsuario"
                    value={form.numeroDocumentoUsuario} onChange={handleChange}
                    className="mt-1 block w-full border rounded px-2 py-1" required
                  />
                </div>
              </div>

              {/* Contraseña opcional */}
              <div>
                <label htmlFor="hashContrasenaUsuario" className="block font-medium">Nueva contraseña</label>
                <input id="hashContrasenaUsuario" type="password" name="hashContrasenaUsuario"
                  value={form.hashContrasenaUsuario ?? ''} onChange={handleChange}
                  className="mt-1 block w-full border rounded px-2 py-1"
                />
                <p className="text-sm text-gray-500 mt-1">Déjalo vacío si no quieres cambiar.</p>
              </div>

              {/* Botones Cancelar / Guardar */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  className="px-5 py-2 rounded-md border"
                  onClick={() => { setEditing(false); setForm(user!); }}
                >Cancelar</button>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md">Guardar cambios</button>
              </div>
            </form>
          ) : (
            // Vista de solo lectura
            <>
              <div className="flex items-center space-x-4">
                <Image
                  src="/images/default-avatar.png"
                  width={80} height={80}
                  className="rounded-full border"
                  alt="Avatar"
                />
                <div>
                  <p className="text-xl font-semibold">{user?.nombreUsuario} {user?.apellidoUsuario}</p>
                  <p className="text-gray-600">@{user?.alias}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><span className="font-medium">Email:</span> {user?.emailUsuario}</p>
                  <p><span className="font-medium">Teléfono:</span> {user?.telefonoUsuario}</p>
                </div>
                <div>
                  <p><span className="font-medium">Rol:</span> {user?.rolUsuario}</p>
                  <p><span className="font-medium">Documento:</span> {user?.numeroDocumentoUsuario}</p>
                </div>
              </div>

              <div className="mt-6">
                {/* Botón que activa el modo edición */}
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md"
                  onClick={() => setEditing(true)}
                >Editar perfil</button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

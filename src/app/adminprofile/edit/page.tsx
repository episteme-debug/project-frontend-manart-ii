'use client';

import { AppSidebar } from "@/components/app-sidebar";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Usuario } from "@/types/usuario";

export default function EditAdminProfilePage() {
  // Obtiene el router para navegación programática
  const router = useRouter();
  // Lee el parámetro 'id' de la URL (identificador numérico del usuario)
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");

  // Estado que mantiene los datos del formulario
  const [form, setForm] = useState<Usuario>({
    idUsuario: 0,
    alias: "",
    nombreUsuario: "",
    apellidoUsuario: "",
    emailUsuario: "",
    telefonoUsuario: "",
    numeroDocumentoUsuario: "",
    hashContrasenaUsuario: "",
    rolUsuario: "",
  } as Usuario);

  // Estados auxiliares: carga y mensajes
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");

  /**
   * Este efecto carga la información del usuario al montar el componente.
   * Llama al endpoint GET /private/obtenerporid/{id} en Spring Boot.
   */
  useEffect(() => {
    if (!idParam) {
      setMensaje("No se proporcionó el ID de usuario.");
      setLoading(false);
      return;
    }

    async function loadUsuario() {
      try {
        const url = `http://localhost:8080/api/usuario/private/obtenerporid/${idParam}`;
        const response = await axios.get<Usuario>(url, { withCredentials: true });
        setForm(response.data);
      } catch (error: any) {
        console.error("Error cargando datos:", error);
        setMensaje("No se pudieron cargar los datos del usuario.");
      } finally {
        setLoading(false);
      }
    }

    loadUsuario();
  }, [idParam]);

  /**
   * Manejador genérico para cambios en inputs y selects.
   */
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value } as Usuario));
  }

  /**
   * Envía los datos actualizados al backend via PATCH.
   * Endpoint: PATCH /private/actualizardatos/{idUsuario}
   */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setMensaje("");

    try {
      const url = `http://localhost:8080/api/usuario/private/actualizardatos/${idParam}`;
      await axios.patch<Usuario>(url, {
        nombre: form.nombreUsuario,
        apellido: form.apellidoUsuario,
        email: form.emailUsuario,
        telefono: form.telefonoUsuario,
        numeroDocumento: form.numeroDocumentoUsuario,
      }, { withCredentials: true });

      setMensaje("Perfil actualizado correctamente.");
      // Redirige a la vista de perfil tras éxito
      router.push(`/adminprofile?id=${idParam}`);
    } catch (error: any) {
      console.error("Error actualizando perfil:", error);
      setMensaje(`Error al actualizar: ${error.response?.data || error.message}`);
    }
  }

  // Mientras se cargan datos, muestra spinner básico
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

  // Render principal con el formulario de edición
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r">
        <AppSidebar />
      </aside>

      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6 space-y-6">
          <h2 className="text-2xl font-bold">Editar Perfil</h2>

          <div className="flex items-center space-x-4">
            <Image
              src="/images/default-avatar.png"
              alt="Avatar"
              width={64}
              height={64}
              className="rounded-full border"
            />
            {/* Muestra el alias como identificador visual */}
            <p className="font-medium">@{form.alias}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campos de texto controlados por estado */}
            <div>
              <label htmlFor="nombreUsuario" className="block font-medium">
                Nombre
              </label>
              <Input
                id="nombreUsuario"
                name="nombreUsuario"
                value={form.nombreUsuario}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="apellidoUsuario" className="block font-medium">
                Apellido
              </label>
              <Input
                id="apellidoUsuario"
                name="apellidoUsuario"
                value={form.apellidoUsuario}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email y teléfono lado a lado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="emailUsuario" className="block font-medium">
                  Email
                </label>
                <Input
                  id="emailUsuario"
                  type="email"
                  name="emailUsuario"
                  value={form.emailUsuario}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="telefonoUsuario" className="block font-medium">
                  Teléfono
                </label>
                <Input
                  id="telefonoUsuario"
                  name="telefonoUsuario"
                  value={form.telefonoUsuario}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Documento y rol */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="numeroDocumentoUsuario" className="block font-medium">
                  Documento
                </label>
                <Input
                  id="numeroDocumentoUsuario"
                  name="numeroDocumentoUsuario"
                  value={form.numeroDocumentoUsuario}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="rolUsuario" className="block font-medium">
                  Rol
                </label>
                <select
                  id="rolUsuario"
                  name="rolUsuario"
                  className="mt-1 block w-full border rounded px-2 py-1"
                  value={form.rolUsuario}
                  disabled
                >
                  {/* Rol no editable en este formulario */}
                  <option value="ADMIN">Admin</option>
                  <option value="COMPRADOR">Comprador</option>
                  <option value="VENDEDOR">Vendedor</option>
                </select>
              </div>
            </div>

            {/* Contraseña opcional: si queda vacía, no se envía al backend */}
            <div>
              <label htmlFor="hashContrasenaUsuario" className="block font-medium">
                Nueva contraseña
              </label>
              <Input
                id="hashContrasenaUsuario"
                type="password"
                name="hashContrasenaUsuario"
                value={form.hashContrasenaUsuario ?? ""}
                onChange={handleChange}
              />
              <p className="text-sm text-gray-500 mt-1">
                Déjalo vacío si no quieres cambiar la contraseña.
              </p>
            </div>

            {/* Botón de envío */}
            <div className="pt-4">
              <Button type="submit" className="w-full">
                Guardar cambios
              </Button>
            </div>

            {/* Mensaje de éxito o error */}
            {mensaje && (
              <p className={`mt-2 ${mensaje.startsWith("Error") ? "text-red-600" : "text-green-600"}`}>
                {mensaje}
              </p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

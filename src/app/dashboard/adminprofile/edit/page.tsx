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
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");

  const [form, setForm] = useState<Usuario>({
    idUsuario: 0,
    alias: "",
    nombreUsuario: "",
    apellidoUsuario: "",
    emailUsuario: "",
    telefonoUsuario: "",
    numeroDocumentoUsuario: "",
    rolUsuario: "",
  });

  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");

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

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setMensaje("");

    try {
      const url = `http://localhost:8080/api/usuario/private/actualizardatos/${idParam}`;
      const dataToUpdate = {
        nombre: form.nombreUsuario,
        apellido: form.apellidoUsuario,
        email: form.emailUsuario,
        telefono: form.telefonoUsuario,
        numeroDocumento: form.numeroDocumentoUsuario,
      };

      await axios.patch<Usuario>(url, dataToUpdate, { withCredentials: true });
      setMensaje("Perfil actualizado correctamente.");
      router.push(`?id=${idParam}`);
    } catch (error: any) {
      console.error("Error actualizando perfil:", error);
      setMensaje(`Error al actualizar: ${error.response?.data || error.message}`);
    }
  }

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
            <p className="font-medium">@{form.alias}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nombreUsuario" className="block font-medium">
                Nombre
              </label>
              <Input
                id="nombreUsuario"
                name="nombreUsuario"
                value={form.nombreUsuario || ""}
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
                value={form.apellidoUsuario || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="emailUsuario" className="block font-medium">
                  Email
                </label>
                <Input
                  id="emailUsuario"
                  type="email"
                  name="emailUsuario"
                  value={form.emailUsuario || ""}
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
                  value={form.telefonoUsuario || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="numeroDocumentoUsuario" className="block font-medium">
                  Documento
                </label>
                <Input
                  id="numeroDocumentoUsuario"
                  name="numeroDocumentoUsuario"
                  value={form.numeroDocumentoUsuario || ""}
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
                  value={form.rolUsuario || ""}
                  disabled
                >
                  <option value="ADMIN">Admin</option>
                  <option value="COMPRADOR">Comprador</option>
                  <option value="VENDEDOR">Vendedor</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full">
                Guardar cambios
              </Button>
            </div>

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

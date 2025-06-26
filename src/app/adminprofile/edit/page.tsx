'use client';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Usuario } from "@/types/usuario";

export default function EditAdminProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const alias = searchParams.get("alias")!; // ① forzamos non-null

  const [form, setForm] = useState<Usuario>({
    alias: "",
    nombreUsuario: "",
    apellidoUsuario: "",
    emailUsuario: "",
    telefonoUsuario: "",
    numeroDocumentoUsuario: "",
    hashContrasenaUsuario: "",
    rolUsuario: "",
  } as Usuario);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");

  // 2️⃣ handleChange genérico
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value } as Usuario));
  }

  // 1️⃣ Carga inicial
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `http://localhost:8080/api/usuario/public/alias/${encodeURIComponent(alias)}`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );
        if (!res.ok) throw new Error(await res.text());
        const data = (await res.json()) as Usuario;
        setForm(data);
      } catch (err: any) {
        console.error("Error cargando datos:", err);
        setMensaje("No se pudieron cargar los datos.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [alias]);

  // 3️⃣ Envío del formulario
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setMensaje("");
    try {
      const res = await fetch("/api/usuario", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      setMensaje("Perfil actualizado correctamente");
      // ① alias es string, no null, así que encodesafe
      router.push(`/adminprofile?alias=${encodeURIComponent(alias)}`);
    } catch (err: any) {
      console.error("Error actualizando perfil:", err);
      setMensaje("Error al actualizar: " + err.message);
    }
  }

  // 4️⃣ Spinner mientras carga
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
            <p className="font-medium">{form.alias}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div>
              <label htmlFor="nombreUsuario" className="block font-medium">
                Nombre
              </label>
              <Input
                id="nombreUsuario"
                name="nombreUsuario"
                value={form.nombreUsuario}
                onChange={handleChange} // ② conectamos aquí
                required
              />
            </div>

            {/* Apellido */}
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

            {/* Email y Teléfono */}
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

            {/* Documento y Rol */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="numeroDocumentoUsuario"
                  className="block font-medium"
                >
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
                  onChange={handleChange}
                >
                  <option value="ADMIN">Admin</option>
                  <option value="COMPRADOR">Comprador</option>
                  <option value="VENDEDOR">Vendedor</option>
                </select>
              </div>
            </div>

            {/* Nueva contraseña */}
            <div>
              <label
                htmlFor="hashContrasenaUsuario"
                className="block font-medium"
              >
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
                Déjalo vacío si no quieres cambiar.
              </p>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full">
                Guardar cambios
              </Button>
            </div>

            {mensaje && (
              <p
                className={`mt-2 ${mensaje.startsWith("Error") ? "text-red-600" : "text-green-600"
                  }`}
              >
                {mensaje}
              </p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { UsuarioEnum } from "@/types/Roles";
import { Usuario } from "@/types/usuario";

export default function AdminProfilePage() {
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id"); // 
  const [user, setUser] = useState<Usuario | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [usuariosPorRol, setUsuariosPorRol] = useState<Usuario[]>([]);

  // 1️⃣ Fetch del perfil por ID
  useEffect(() => {
    if (!idParam) {
      setErrorMsg("No se proporcionó el ID de usuario.");
      return;
    }
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/usuario/private/obtenerporid/${idParam}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!res.ok) throw new Error(await res.text());
        setUser(await res.json());
      } catch (err) {
        console.error("❌ Error cargando perfil:", err);
        setErrorMsg("Hubo un problema cargando tu perfil.");
      }
    };
    fetchUser();
  }, [idParam]);

  // 2️⃣ Fetch de usuarios por rol (p.ej. ARTESANO)
  const fetchUsuariosPorRol = async (rol: UsuarioEnum) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/usuario/private/obtenerporrol/${rol}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) {
        const text = await res.text();
        console.error("❌ Backend respondió:", text);
        throw new Error(text);
      }
      const data: Usuario[] = await res.json();
      setUsuariosPorRol(data);
    } catch (err: any) {
      console.error("❌ Error al obtener usuarios por rol:", err.message);
    }
  };

  // Disparo inicial: trae los artesanos informales
  useEffect(() => {
    fetchUsuariosPorRol("ADMIN");
  }, []);

  return (
    <div className="grid grid-cols-2 h-screen bg-gray-100">
      <SidebarProvider>
        <aside className="w-64 bg-white border-r">
          <AppSidebar />
        </aside>
      </SidebarProvider>

      <main className="overflow-y-auto p-8 bg-gray-50">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Perfil del Administrador
          </h1>

          {user ? (
            <>
              <div className="flex items-center space-x-4">
                <Image
                  src="/images/default-avatar.png"
                  width={80}
                  height={80}
                  className="rounded-full border"
                  alt="Avatar"
                />
                <div>
                  <p className="text-xl font-semibold">
                    {user.nombreUsuario} {user.apellidoUsuario}
                  </p>
                  <p className="text-gray-600">@{user.alias}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p>
                    <span className="font-medium text-gray-700">Email:</span>{" "}
                    {user.emailUsuario}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Teléfono:</span>{" "}
                    {user.telefonoUsuario}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-medium text-gray-700">Rol:</span>{" "}
                    {user.rolUsuario}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">
                      Documento:
                    </span>{" "}
                    {user.numeroDocumentoUsuario}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Link href={`/adminprofile/edit?id=${idParam}`}>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md">
                    Editar perfil
                  </button>
                </Link>
              </div>

              <div className="pt-6 border-t">
                <h2 className="text-lg font-semibold mb-2">
                  Artesanos informales
                </h2>
                <ul className="list-disc list-inside">
                  {usuariosPorRol.map((u) => (
                    <li key={u.idUsuario}>
                      {u.nombreUsuario} {u.apellidoUsuario} – @{u.alias}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <p className="text-red-600">
              {errorMsg || "No se pudieron cargar los datos del perfil."}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
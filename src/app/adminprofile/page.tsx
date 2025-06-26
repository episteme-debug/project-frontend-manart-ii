'use client'; // si estás usando Next.js 13/14 con app router

import Link from "next/link";
import Image from "next/image"; // para manejar imágenes optimizadas
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useEffect, useState } from "react";
import { Usuario } from "@/types/usuario";

// 👇 Suponemos que user viene de un fetch en el mismo componente o lo recibes por props
export default function AdminProfilePage() {
  const [user, setUser] = useState<Usuario | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Aquí puedes obtener el usuario autenticado automáticamente
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/usuario/public/detalleusuario", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText);
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("❌ Error cargando perfil:", err);
        setErrorMsg("Hubo un problema cargando tu perfil.");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 👉 Aside izquierdo (sidebar fijo) */}
      <SidebarProvider>
        <aside className="w-64 bg-white border-r">
          <AppSidebar />
        </aside>
      </SidebarProvider>

      {/* 👉 Contenido principal */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Contenedor centrado */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Perfil del Administrador</h1>

          {user ? (
            <>
              {/* 👉 Imagen de perfil circular */}
              <div className="flex items-center space-x-4">
                <Image
                  src="/images/default-avatar.png" // asegúrate de tener esta imagen o cámbiala
                  width={80}
                  height={80}
                  className="rounded-full border"
                  alt="Avatar"
                />
                <div>
                  <p className="text-xl font-semibold">{user.nombreUsuario} {user.apellidoUsuario}</p>
                  <p className="text-gray-600">@{user.alias}</p>
                </div>
              </div>

              {/* 👉 Información del usuario */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><span className="font-medium text-gray-700">Email:</span> {user.emailUsuario}</p>
                  <p><span className="font-medium text-gray-700">Teléfono:</span> {user.telefonoUsuario}</p>
                </div>
                <div>
                  <p><span className="font-medium text-gray-700">Rol:</span> {user.rolUsuario}</p>
                  <p><span className="font-medium text-gray-700">Documento:</span> {user.numeroDocumentoUsuario}</p>
                </div>
              </div>

              {/* 👉 Botón para editar perfil */}
              <div className="mt-6">
                <Link href={`/adminprofile/edit?alias=${user.alias}`}>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md">
                    Editar perfil
                  </button>
                </Link>
              </div>

              {/* 👉 Zona futura para otras configuraciones */}
              <div className="pt-6 border-t">
                <h2 className="text-lg font-semibold mb-2">Opciones adicionales</h2>
                <p className="text-sm text-gray-600">Aquí puedes agregar: cambiar contraseña, direcciones, métodos de pago, etc.</p>
              </div>
            </>
          ) : (
            <p className="text-red-600">{errorMsg || "No se pudieron cargar los datos del perfil."}</p>
          )}
        </div>
      </main>
    </div>
  );
}

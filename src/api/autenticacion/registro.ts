import { NextResponse } from "next/server";
import { createUsuario, getUsuario } from "@/services/adminProfile";
import { usuario_rol_usuario } from "@prisma/client";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    alias: string;
    nombreUsuario: string;
    apellidoUsuario: string;
    emailUsuario: string;
    telefonoUsuario: string;
    hashContrasenaUsuario: string;
    rolUsuario: usuario_rol_usuario;
    ciudadUsuario: string;
  };

  // 1. Duplicados
  if (await getUsuario(body.alias)) {
    return NextResponse.json({ error: "Alias ya existe" }, { status: 409 });
  }

  // 2. Mapea tus campos camelCase → snake_case del modelo
  const nuevo = await createUsuario({
    alias: body.alias,
    nombre_usuario: body.nombreUsuario,
    apellido_usuario: body.apellidoUsuario,
    email_usuario: body.emailUsuario,
    telefono_usuario: body.telefonoUsuario,
    hash_contrasena_usuario: body.hashContrasenaUsuario,
    rol_usuario: body.rolUsuario || usuario_rol_usuario.COMPRADOR, // usa COMPRADOR por defecto si no se manda
    ciudad_usuario: body.ciudadUsuario,
    // omite imagen_perfil_usuario y numero_documento_usuario si no las mandas
  });

  return NextResponse.json(nuevo, { status: 201 });
}

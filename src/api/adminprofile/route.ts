// src/app/api/usuario/route.ts
import { NextResponse } from "next/server";
import { createUsuario, updateUsuario, getUsuario } from "@/services/adminProfile"
// GET /api/usuario?alias=xxx
export async function GET(req: Request) {
  const alias = new URL(req.url).searchParams.get("alias");
  if (!alias) {
    return NextResponse.json({ error: "Alias no encontrado" }, { status: 400 });
  }
  const user = await getUsuario(alias);
  if (!user) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }
  return NextResponse.json(user);
}

// POST /api/usuario
export async function POST(req: Request) {
  const body = await req.json();
  if (await getUsuario(body.alias)) {
    return NextResponse.json({ error: "Alias ya existe" }, { status: 409 });
  }
  const nuevo = await createUsuario({
    alias: body.alias,
    nombre_usuario: body.nombreUsuario,
    apellido_usuario: body.apellidoUsuario,
    email_usuario: body.emailUsuario,
    hash_contrasena_usuario: body.hashContrasenaUsuario,
    telefono_usuario: body.telefonoUsuario,
    numero_documento_usuario: body.numeroDocumentoUsuario,
    estado_usuario: body.estado_usuario,               
    imagen_perfil_usuario: body.imagen_perfil_usuario,         
    rol_usuario: body.rolUsuario,     
    ciudad_usuario: body.ciudadUsuario,          

  });
  return NextResponse.json(nuevo, { status: 201 });
}

// PUT /api/usuario
export async function PUT(req: Request) {
  const body = await req.json();
  if (!(await getUsuario(body.alias))) {
    return NextResponse.json({ error: "Alias no existe" }, { status: 404 });
  }
  const actualizado = await updateUsuario(body.alias, {
    nombre_usuario: body.nombreUsuario,
    apellido_usuario: body.apellidoUsuario,
    email_usuario: body.emailUsuario,
    hash_contrasena_usuario: body.hashContrasenaUsuario,
    telefono_usuario: body.telefonoUsuario,
    numero_documento_usuario: body.numeroDocumentoUsuario,
    // Puedes actualizar rolUsuario, imagenPerfilUsuario, etc. si lo deseas
  });
  return NextResponse.json(actualizado, { status: 200 });
}

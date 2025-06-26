import { NextResponse } from "next/server";
import {
  createDireccion,
  updateDireccion,
  listDirecciones,
} from "@/services/Direccionservices";

export async function GET(req: Request) {
  // Extraemos id_usuario de los query params: ?user=123
  const url = new URL(req.url);
  const userId = url.searchParams.get("user");
  if (!userId) {
    return NextResponse.json({ error: "user param is required" }, { status: 400 });
  }
  // Llamamos a nuestro servicio para obtener la lista
  const items = await listDirecciones(Number(userId));
  return NextResponse.json(items); // 200 OK + JSON array
}

export async function POST(req: Request) {
  // Leemos el cuerpo JSON con los datos del formulario
  const body = await req.json();
  // Con createDireccion insertamos la nueva fila
  const nueva = await createDireccion({
    barrio:                body.barrio,
    bis_via_principal:     body.bis_via_principal,
    bis_via_secundaria:    body.bis_via_secundaria,
    ciudad:                body.ciudad,
    complemento:           body.complemento,
    departamento:          body.departamento,
    es_predeterminada:     body.es_predeterminada,
    letra_via_principal:   body.letra_via_principal,
    letra_via_secundaria:  body.letra_via_secundaria,
    numero_predio:         body.numero_predio,
    numero_via_principal:  body.numero_via_principal,
    numero_via_secundaria: body.numero_via_secundaria,
    tipo_via:              body.tipo_via,
    id_usuario:            BigInt(body.id_usuario),
  });
  return NextResponse.json(nueva, { status: 201 });
}

export async function PUT(req: Request) {
  const body = await req.json();
  if (!body.id_direccion) {
    return NextResponse.json({ error: "id_direccion required" }, { status: 400 });
  }
  // updateDireccion actualizará y devolverá la fila modificada
  const actualizada = await updateDireccion(body.id_direccion, {
    barrio:      body.barrio,
    ciudad:      body.ciudad,
    complemento: body.complemento,
    // ...
  });
  return NextResponse.json(actualizada);
}

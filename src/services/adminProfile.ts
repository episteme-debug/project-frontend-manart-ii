// src/services/usuarioService.ts
import { prisma } from "@/lib/prisma";          // ← instancia de PrismaClient
import type { usuario, Prisma } from "@prisma/client";  // ← types: el modelo y el namespace Prisma



//  createUsuario usa Prisma.usuarioCreateInput para inferir qué campos son obligatorios
export async function createUsuario(data: Prisma.usuarioCreateInput) {
  // prisma.usuario → tabla 'usuario'
  return prisma.usuario.create({ data }); // ejecuta INSERT
}

//  getUsuario busca un registro único por alias
export async function getUsuario(alias: string) {
  return prisma.usuario.findUnique({ where: { alias } }); // SELECT ... WHERE alias=?
}

//  updateUsuario actualiza solo los campos que pasas en 'data'
export async function updateUsuario(
  alias: string,
  data: Partial<Omit<usuario, "id_usuario" | "alias">>
) {
  return prisma.usuario.update({
    where: { alias }, // identifica qué fila
    data,             // campos a modificar
  });
}

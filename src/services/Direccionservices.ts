// Aquí importamos la instancia única de PrismaClient
import { prisma } from "@/lib/prisma";
// Importamos también el tipo generado para nuestra tabla "direccion"
import type { direccion } from "@prisma/client";

/**
 * Crea una nueva dirección en la base de datos.
 * @param data Objeto con todos los campos excepto la PK (id_direccion)
 */
export async function createDireccion(
  data: Omit<direccion, "id_direccion" | "fecha_actualizacion" | "fecha_creacion">
) {
  // prisma.direccion.create mapea directo a INSERT en MySQL
  return prisma.direccion.create({
    data: {
      ...data,
      fecha_creacion: new Date(),      // ponemos fecha de hoy
      fecha_actualizacion: new Date(), // lo mismo al crear
    },
  });
}

/**
 * Actualiza una dirección existente, buscándola por su id.
 * @param id id_direccion de la fila a actualizar
 * @param data Campos que queremos cambiar
 */
export async function updateDireccion(
  id: number,
  data: Partial<Omit<direccion, "id_direccion" | "fecha_creacion">>
) {
  return prisma.direccion.update({
    where: { id_direccion: BigInt(id) },
    data: {
      ...data,
      fecha_actualizacion: new Date(), // siempre actualizamos el timestamp
    },
  });
}

/**
 * Lista todas las direcciones de un usuario.
 * @param id_usuario clave foránea
 */
export async function listDirecciones(id_usuario: number) {
  return prisma.direccion.findMany({
    where: { id_usuario: BigInt(id_usuario) },
  });
}

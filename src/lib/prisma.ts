import { PrismaClient } from '@prisma/client';

const GlobalforPrisma = global as any;
//Evita que, en modo desarrollo con recarga en caliente, se creen múltiples conexiones a la base de datos.
export const prisma = GlobalforPrisma.prisma || new PrismaClient({log:['query']})
//Si ya existe globalForPrisma.prisma, la reusa, si no existe, crea una nueva instancia de PrismaClient.
if (process.env.NODE_ENV !== 'production'){
  GlobalforPrisma.prisma = prisma;
}
//Guarda esa instancia en globalForPrisma.prisma, pero solo si NO estás en producción.
let prismaClient: any;

try {
  const { PrismaClient } = require('@prisma/client');
  prismaClient = new PrismaClient();
} catch (e) {
  prismaClient = null;
}

export const prisma = prismaClient;
export default prisma;

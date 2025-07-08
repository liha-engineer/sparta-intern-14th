import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  errorFormat: 'pretty',
});

export const findUser = async (username) => {
  return await prisma.accounts.findFirst({
    where: { username },
  });
};

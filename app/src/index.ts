import { PrismaClient } from ".prisma/client";

export const db = new PrismaClient();

export const main = async () => {
  console.log(process.cwd(), await db.schools.findFirst());
};

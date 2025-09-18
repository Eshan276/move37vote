import { prisma } from "../prismaClient.js";

export async function createUser(data) {
  return prisma.user.create({ data });
}

export async function getUsers() {
  return prisma.user.findMany();
}

import { prisma } from "../prismaClient.js";

export async function createPoll(userId, question, options) {
  return prisma.poll.create({
    data: {
      question,
      creator: { connect: { id: userId } },
      options: {
        create: options.map((text) => ({ text })),
      },
    },
    include: { options: true },
  });
}

export async function getPolls() {
  return prisma.poll.findMany({ include: { options: true } });
}

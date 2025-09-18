import { prisma } from "../prismaClient.js";

export async function castVote(userId, pollId, optionId) {
  return prisma.vote.create({
    data: {
      user: { connect: { id: userId } },
      poll: { connect: { id: pollId } },
      option: { connect: { id: optionId } },
    },
  });
}

export async function getVotesForPoll(pollId) {
  return prisma.pollOption.findMany({
    where: { pollId },
    include: {
      _count: {
        select: { votes: true },
      },
    },
  });
}

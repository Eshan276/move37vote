import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();


router.get("/", async (req, res) => {
  try {
    const polls = await prisma.poll.findMany({
      include: { options: true },
    });
    res.json(polls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  const pollId = parseInt(req.params.id);

  try {
    const poll = await prisma.poll.findUnique({
      where: { id: pollId },
      include: {
        options: {
          include: {
            _count: {
              select: { votes: true },
            },
          },
        },
        creator: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!poll) return res.status(404).json({ error: "Poll not found" });

    res.json(poll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/", async (req, res) => {
  const { question, options, creatorId } = req.body;

  try {
    const poll = await prisma.poll.create({
      data: {
        question,
        creator: {
          connect: { id: creatorId },
        },
        options: {
          create: options.map((text) => ({ text })),
        },
      },
      include: { options: true },
    });
    res.json(poll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

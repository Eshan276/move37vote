import express from "express";
import { castVote, getVotesForPoll } from "../services/voteService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, pollId, optionId } = req.body;

  if (!userId || !pollId || !optionId) {
    return res
      .status(400)
      .json({ error: "userId, pollId, and optionId are required" });
  }

  try {
    const vote = await castVote(userId, pollId, optionId);

    // Broadcast updated results
    req.io
      .to(`poll-${pollId}`)
      .emit("voteUpdate", await getVotesForPoll(pollId));

    res.json(vote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

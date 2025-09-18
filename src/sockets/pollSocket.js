import { getVotesForPoll } from "../services/voteService.js";

export function pollSocket(io, socket) {
  socket.on("joinPoll", async (pollId) => {
    socket.join(`poll-${pollId}`);
    const results = await getVotesForPoll(pollId);
    io.to(socket.id).emit("voteUpdate", results);
  });
}

import express from "express";
import usersRouter from "./routes/users.js";
import pollsRouter from "./routes/polls.js";
import votesRouter from "./routes/votes.js";

const app = express();
app.use(express.json());

let io;

// Call this from index.js after creating the Socket.IO server
export function setIO(serverIO) {
  io = serverIO;

  // Attach io to all requests before routes
  app.use((req, res, next) => {
    req.io = io;
    next();
  });

  // Mount routes **after** attaching io
  app.use("/users", usersRouter);
  app.use("/polls", pollsRouter);
  app.use("/votes", votesRouter);
}

export default app;

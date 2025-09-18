import express from "express";
import usersRouter from "./routes/users.js";
import pollsRouter from "./routes/polls.js";
import votesRouter from "./routes/votes.js";

const app = express();
app.use(express.json());

let io;


export function setIO(serverIO) {
  io = serverIO;


  app.use((req, res, next) => {
    req.io = io;
    next();
  });


  app.use("/users", usersRouter);
  app.use("/polls", pollsRouter);
  app.use("/votes", votesRouter);
}

export default app;

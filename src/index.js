import http from "http";
import { Server } from "socket.io";
import app, { setIO } from "./app.js";
import { pollSocket } from "./sockets/pollSocket.js";

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

setIO(io);

io.on("connection", (socket) => {
  pollSocket(io, socket);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

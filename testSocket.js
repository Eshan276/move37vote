import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

socket.emit("joinPoll", 1); //replace polls id as needed

socket.on("voteUpdate", (data) => {
  console.log("Live results:", data);
});

console.log("Socket client running... Press Ctrl+C to exit");

import express from "express";
import { createUser, getUsers } from "../services/userService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const user = await createUser(req.body);
  res.json(user);
});

router.get("/", async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

export default router;

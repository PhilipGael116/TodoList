import express from "express"
import { createTodo } from "../controllers/todoList.controllers.js"

const router = express.Router();

router.post("/", createTodo);

export default router;


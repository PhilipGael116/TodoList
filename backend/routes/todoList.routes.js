import express from "express"
import { createTodo, getAllTodos, updateTodo, deleteTodo } from "../controllers/todoList.controllers.js"

const router = express.Router();

router.post("/", createTodo);
router.get("/", getAllTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;


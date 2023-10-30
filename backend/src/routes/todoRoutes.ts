import express from "express";
const router = express.Router();
import {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController";
router.get("/todos", getAllTodos);
router.post("/todos", addTodo);
router.patch("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);

export default router;

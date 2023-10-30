import { Request, Response } from 'express';
import Todo, { ITodo } from '../models/todoModel';

export const getAllTodos = async (req: Request, res: Response) => {
    try {
      const todos = await Todo.find();
      res.status(200).json(todos);
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }

  export const addTodo = async (req: Request, res: Response) => {
    const task = req.body;
    if (!task) {
      res.json({message:"Task is required !"})
    }
    const todo = new Todo(task);
    try {
      await todo.save();
      res.status(201).json({message:"Added succesfully !"});
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  export const updateTodo = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const updateTodo = await Todo.findByIdAndUpdate(id,req.body)
      if(!updateTodo){
        res.status(404).json({message:"could not find todo !"})
      }
      res.status(200).json({message:"Updated successfully !"})
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  export const deleteTodo = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const deleteTodo = await Todo.findByIdAndDelete(id)
      if(!deleteTodo){
        res.status(404).json({message:"could not find todo !"})
      }
      res.status(200).json({message:"Deleted successfully !"})
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
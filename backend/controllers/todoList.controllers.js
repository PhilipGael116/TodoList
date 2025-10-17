import TodoList from "../model/todoList.model.js";

export const createTodo = async(req, res) => {
    try {
        const todo = await TodoList.create(req.body);
        res.status(201).json(todo);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}

export const getAllTodos = async(req, res) => {
    try {
        const todos = await TodoList.find().select("text completed");
        if(!todos) {
            return res.status(404).json({message: "No todos found"});
        }
        res.status(200).json(todos);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}
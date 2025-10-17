import mongoose from "mongoose";

const todoListSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const TodoList = mongoose.model("TodoList", todoListSchema);
export default TodoList;
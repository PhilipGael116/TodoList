import express from "express";
import connectDB from "./config/db.js";
import todoListRoutes from "./routes/todoList.routes.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Server Is Live!");
});

app.use(express.json());

// Routes
app.use("/api/todos", todoListRoutes);

// Server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});

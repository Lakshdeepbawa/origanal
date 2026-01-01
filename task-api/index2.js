const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});


app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: Date.now(),
    title,
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.completed = !task.completed;
  res.status(200).json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.filter(t => t.id !== id);

  res.status(200).json({ message: "Task deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Server running at http://localhost:${PORT}`);
});

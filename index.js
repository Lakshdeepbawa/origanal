/********************************************************************
 * STEP 1: Import Express
 * --------------------------------------------------
 * Express is a web framework built on top of Node.js.
 * It internally uses Node's http module but gives us
 * an easier way to:
 *  - create servers
 *  - handle routes
 *  - build APIs
 ********************************************************************/
const express = require("express");


/********************************************************************
 * STEP 2: Create Express Application
 * --------------------------------------------------
 * express() returns a function/object.
 * This `app` object represents our entire server.
 * All middleware, routes, and configurations attach to it.
 ********************************************************************/
const app = express();


/********************************************************************
 * STEP 3: Define Port Number
 * --------------------------------------------------
 * The port is where the server will listen for requests.
 * Example:
 *   http://localhost:3000
 ********************************************************************/
const PORT = 5000;


/********************************************************************
 * STEP 4: Middleware to Parse JSON
 * --------------------------------------------------
 * Middleware runs BEFORE the route handler.
 *
 * express.json():
 *  - reads incoming request body
 *  - converts JSON into a JavaScript object
 *  - attaches it to req.body
 *
 * Without this middleware:
 *   req.body === undefined
 ********************************************************************/
app.use(express.json());


/********************************************************************
 * STEP 5: In-Memory Data Store
 * --------------------------------------------------
 * This array acts like a temporary database.
 * Data is stored in RAM.
 * When the server restarts → data is lost.
 *
 * Used only for learning API concepts.
 ********************************************************************/
let tasks = [];


app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

/********************************************************************
 * STEP 6: GET /tasks
 * --------------------------------------------------
 * Purpose:
 *  - Fetch all tasks
 *
 * HTTP Method:
 *  - GET (used to READ data)
 *
 * Endpoint:
 *  - /tasks
 ********************************************************************/
app.get("/tasks", (req, res) => {

  // Send response with:
  //  - HTTP status code 200 (OK)
  //  - tasks array converted to JSON
  res.status(200).json(tasks);
});


/********************************************************************
 * STEP 7: POST /tasks
 * --------------------------------------------------
 * Purpose:
 *  - Create a new task
 *
 * HTTP Method:
 *  - POST (used to CREATE data)
 *
 * Client sends JSON like:
 *  {
 *    "title": "Learn REST APIs"
 *  }
 ********************************************************************/
app.post("/tasks", (req, res) => {

  // Destructure `title` from request body
  // req.body comes from express.json() middleware
  const { title } = req.body;

  // Input validation
  // If title is missing or empty
  if (!title) {
    // 400 = Bad Request (client error)
    return res.status(400).json({
      error: "Title is required"
    });
  }

  // Create a new task object
  const newTask = {
    // Date.now() gives a unique timestamp
    id: Date.now(),

    // Title sent by the client
    title: title,

    // Default task status
    completed: false
  };

  // Store the new task in memory
  tasks.push(newTask);

  // 201 = Resource created successfully
  // Send the newly created task back to client
  res.status(201).json(newTask);
});


/********************************************************************
 * STEP 8: PUT /tasks/:id
 * --------------------------------------------------
 * Purpose:
 *  - Update an existing task
 *
 * HTTP Method:
 *  - PUT (used to UPDATE data)
 *
 * :id is a route parameter
 * Example:
 *  PUT /tasks/123456
 ********************************************************************/
app.put("/tasks/:id", (req, res) => {

  // Extract id from URL parameters
  // req.params.id is always a string
  const id = Number(req.params.id);

  // Find the task with matching ID
  const task = tasks.find(task => task.id === id);

  // If task does not exist
  if (!task) {
    // 404 = Not Found
    return res.status(404).json({
      error: "Task not found"
    });
  }

  // Toggle the completed status
  // true -> false
  // false -> true
  task.completed = !task.completed;

  // Send updated task back to client
  res.status(200).json(task);
});


/********************************************************************
 * STEP 9: DELETE /tasks/:id
 * --------------------------------------------------
 * Purpose:
 *  - Delete a task
 *
 * HTTP Method:
 *  - DELETE (used to REMOVE data)
 ********************************************************************/
app.delete("/tasks/:id", (req, res) => {

  // Extract id from URL parameters
  const id = Number(req.params.id);

  // Remove the task by filtering it out
  tasks = tasks.filter(task => task.id !== id);

  // Send confirmation response
  res.status(200).json({
    message: "Task deleted successfully"
  });
});


/********************************************************************
 * STEP 10: Start the Server
 * --------------------------------------------------
 * app.listen():
 *  - starts the HTTP server
 *  - begins listening for incoming requests
 *
 * Callback runs once server is ready.
 ********************************************************************/
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

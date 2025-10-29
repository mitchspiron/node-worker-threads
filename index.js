import express from "express";
import { Worker } from "worker_threads";

const app = express();
const port = process.env.PORT || 3000;

// Non-blocking route
app.get("/non-blocking", (req, res) => {
  res.status(200).send("This page is non-blocking!");
});

// Blocking route using worker threads
app.get("/blocking", (req, res) => {
  // Create a new worker thread
  const worker = new Worker("./worker.js");

  // Listen for messages from the worker
  worker.on("message", (data) => {
    res.status(200).send(`Result is ${data}`);
  });

  // Handle worker errors
  worker.on("error", (err) => {
    res.status(400).send(`An Error occured: ${err}`);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

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

  let result = 0;
  // Simulate heavy computation
  for (let i = 0; i < 1000000000; i++) {
    result++;
  }

  res.status(200).send(`Result is ${result}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

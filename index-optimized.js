import express from "express";
import { Worker } from "worker_threads";

const app = express();
const port = process.env.PORT || 3000;

const THREAD_COUNT = 4;

const createWorker = () => {
  return new Promise((resolve, reject) => {
    // Create a new worker thread
    const worker = new Worker("./worker-optimized.js", {
      workerData: {
        thread_count: THREAD_COUNT,
      },
    });

    // Listen for messages from the worker
    worker.on("message", (data) => {
      // Resolve the promise with the data received from the worker
      resolve(data);
    });

    // Handle worker errors
    worker.on("error", (err) => {
      reject(`An Error occured : ${err}`);
    });
  });
};

// Non-blocking route
app.get("/non-blocking", (req, res) => {
  res.status(200).send("This page is non-blocking!");
});

// Blocking route using worker threads
app.get("/blocking", async (req, res) => {
  // Create multiple worker threads
  const workerPromises = [];
  for (let i = 0; i < THREAD_COUNT; i++) {
    workerPromises.push(createWorker());
  }

  // Wait for all workers to complete and gather results
  const threadResults = await Promise.all(workerPromises);

  // Sum up the results from all threads
  const total = threadResults.reduce((acc, val) => acc + val, 0);
  res.status(200).send(`Result is ${total}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

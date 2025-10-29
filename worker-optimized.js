import { parentPort, workerData } from "worker_threads";

let result = 0;
for (let i = 0; i < workerData.thread_count; i++) {
  result++;
}

// Send the result back to the main thread
parentPort.postMessage(result);

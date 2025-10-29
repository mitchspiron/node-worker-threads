import { parentPort } from "worker_threads";

let result = 0;
for (let i = 0; i < 1000000000; i++) {
  result++;
}

// Send the result back to the main thread
parentPort.postMessage(result);

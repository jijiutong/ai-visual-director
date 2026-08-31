import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { once } from "node:events";
import { join } from "node:path";

const root = process.cwd();
const requests = [];
let pollCount = 0;

const server = createServer((request, response) => {
  let body = "";
  request.setEncoding("utf8");
  request.on("data", (chunk) => { body += chunk; });
  request.on("end", () => {
    requests.push({ method: request.method, url: request.url, body });
    response.setHeader("Content-Type", "application/json");

    if (request.method === "POST" && request.url === "/api/v1/model/generateVideo") {
      response.end(JSON.stringify({ code: 200, data: { id: "prediction-test", status: "starting" } }));
      return;
    }

    if (request.method === "GET" && request.url === "/api/v1/model/prediction/prediction-test") {
      pollCount += 1;
      response.end(JSON.stringify({
        code: 200,
        data: pollCount === 1
          ? { id: "prediction-test", status: "processing" }
          : { id: "prediction-test", status: "completed", outputs: ["https://example.test/video.mp4"] },
      }));
      return;
    }

    response.statusCode = 404;
    response.end(JSON.stringify({ code: 404, message: "not found" }));
  });
});

server.listen(0, "127.0.0.1");
await once(server, "listening");
const { port } = server.address();

const child = spawn(process.execPath, [
  join(root, "platforms/atlas-generate-video.mjs"),
  "--prompt=A paper boat crossing a rain puddle",
  "--duration", "4",
  "--resolution", "480p",
  "--ratio", "16:9",
  "--generate-audio", "false",
  "--poll-interval-ms", "1",
  "--timeout-ms", "2000",
], {
  cwd: root,
  env: {
    ...process.env,
    ATLASCLOUD_API_KEY: "test-key",
    ATLASCLOUD_API_BASE_URL: `http://127.0.0.1:${port}/api/v1`,
  },
});

let stdout = "";
let stderr = "";
child.stdout.on("data", (chunk) => { stdout += chunk; });
child.stderr.on("data", (chunk) => { stderr += chunk; });
const [exitCode] = await once(child, "exit");
server.close();

assert.equal(exitCode, 0, stderr);
assert.deepEqual(JSON.parse(stdout), {
  id: "prediction-test",
  status: "completed",
  outputs: ["https://example.test/video.mp4"],
});
assert.equal(requests.filter(({ method }) => method === "POST").length, 1, "generation POST must run exactly once");
assert.equal(requests.filter(({ method }) => method === "GET").length, 2);

const payload = JSON.parse(requests[0].body);
assert.equal(payload.model, "bytedance/seedance-2.0-mini/text-to-video");
assert.equal(payload.duration, 4);
assert.equal(payload.resolution, "480p");
assert.equal(payload.generate_audio, false);

console.log("ok - Atlas video client submits once and polls to completion");

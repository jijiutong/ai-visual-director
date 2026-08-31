#!/usr/bin/env node

const DEFAULT_BASE_URL = "https://api.atlascloud.ai/api/v1";
const DEFAULT_MODEL = "bytedance/seedance-2.0-mini/text-to-video";
const TERMINAL_SUCCESS = new Set(["completed", "succeeded", "success"]);
const TERMINAL_FAILURE = new Set(["failed", "canceled", "cancelled"]);

function usage() {
  return `Usage:
  ATLASCLOUD_API_KEY=... node platforms/atlas-generate-video.mjs \\
    --prompt "A cinematic tracking shot" [options]

Options:
  --model <id>               Atlas model ID (default: ${DEFAULT_MODEL})
  --duration <4-15>          Video duration in seconds (default: 5)
  --resolution <value>       480p, 720p, 720p-SR, 1080p-SR, or 1440p-SR
  --ratio <value>            16:9, 4:3, 1:1, 3:4, 9:16, 21:9, or adaptive
  --generate-audio <bool>    Generate synchronized audio (default: true)
  --poll-interval-ms <ms>    Poll interval (default: 5000)
  --timeout-ms <ms>          Overall polling timeout (default: 600000)
  --help                     Show this help
`;
}

function parseBoolean(value, flag) {
  if (value === "true") return true;
  if (value === "false") return false;
  throw new Error(`${flag} must be true or false`);
}

function parsePositiveInteger(value, flag) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) {
    throw new Error(`${flag} must be a positive integer`);
  }
  return number;
}

function parseArgs(argv) {
  const options = {
    model: process.env.ATLASCLOUD_VIDEO_MODEL || DEFAULT_MODEL,
    duration: 5,
    resolution: "720p",
    ratio: "16:9",
    generateAudio: true,
    pollIntervalMs: 5000,
    timeoutMs: 600000,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const [flag, inlineValue] = argv[index].split(/=(.*)/s, 2);
    if (flag === "--help") return { help: true };
    const value = inlineValue ?? argv[index + 1];
    if (!value || (!inlineValue && value.startsWith("--"))) throw new Error(`${flag} requires a value`);
    if (inlineValue === undefined) index += 1;

    if (flag === "--prompt") options.prompt = value;
    else if (flag === "--model") options.model = value;
    else if (flag === "--duration") options.duration = parsePositiveInteger(value, flag);
    else if (flag === "--resolution") options.resolution = value;
    else if (flag === "--ratio") options.ratio = value;
    else if (flag === "--generate-audio") options.generateAudio = parseBoolean(value, flag);
    else if (flag === "--poll-interval-ms") options.pollIntervalMs = parsePositiveInteger(value, flag);
    else if (flag === "--timeout-ms") options.timeoutMs = parsePositiveInteger(value, flag);
    else throw new Error(`Unknown option: ${flag}`);
  }

  if (!options.prompt) throw new Error("--prompt is required");
  if (options.duration < 4 || options.duration > 15) {
    throw new Error("--duration must be between 4 and 15 seconds");
  }

  const resolutions = new Set(["480p", "720p", "720p-SR", "1080p-SR", "1440p-SR"]);
  if (!resolutions.has(options.resolution)) throw new Error("Unsupported --resolution value");

  const ratios = new Set(["16:9", "4:3", "1:1", "3:4", "9:16", "21:9", "adaptive"]);
  if (!ratios.has(options.ratio)) throw new Error("Unsupported --ratio value");

  return options;
}

async function readJson(response, label) {
  const text = await response.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    throw new Error(`${label} returned non-JSON response (${response.status})`);
  }
  if (!response.ok || (body.code && body.code !== 200)) {
    const detail = body.message || body.error || text;
    throw new Error(`${label} failed (${response.status}): ${detail}`);
  }
  return body;
}

async function getPrediction(url, headers) {
  let lastError;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url, { headers });
      if (response.status === 429 || response.status >= 500) {
        throw new Error(`temporary HTTP ${response.status}`);
      }
      return await readJson(response, "Prediction poll");
    } catch (error) {
      lastError = error;
      if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 2 ** attempt * 1000));
    }
  }
  throw lastError;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(usage());
    return;
  }

  const apiKey = process.env.ATLASCLOUD_API_KEY;
  if (!apiKey) throw new Error("ATLASCLOUD_API_KEY is required");

  const baseUrl = (process.env.ATLASCLOUD_API_BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, "");
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  // Generation POSTs are intentionally never retried because they may be billable.
  const submitResponse = await fetch(`${baseUrl}/model/generateVideo`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: options.model,
      prompt: options.prompt,
      duration: options.duration,
      resolution: options.resolution,
      ratio: options.ratio,
      generate_audio: options.generateAudio,
    }),
  });
  const submission = await readJson(submitResponse, "Video submission");
  const predictionId = submission.data?.id;
  if (!predictionId) throw new Error("Video submission did not return data.id");

  const deadline = Date.now() + options.timeoutMs;
  while (Date.now() < deadline) {
    const prediction = await getPrediction(`${baseUrl}/model/prediction/${encodeURIComponent(predictionId)}`, headers);
    const status = String(prediction.data?.status || "").toLowerCase();

    if (TERMINAL_SUCCESS.has(status)) {
      process.stdout.write(`${JSON.stringify({
        id: predictionId,
        status,
        outputs: prediction.data?.outputs || [],
      })}\n`);
      return;
    }
    if (TERMINAL_FAILURE.has(status)) {
      throw new Error(`Generation ${predictionId} failed: ${prediction.data?.error || prediction.data?.message || status}`);
    }

    await new Promise((resolve) => setTimeout(resolve, options.pollIntervalMs));
  }

  throw new Error(`Timed out waiting for generation ${predictionId}`);
}

main().catch((error) => {
  process.stderr.write(`atlas-generate-video: ${error.message}\n`);
  process.exitCode = 1;
});

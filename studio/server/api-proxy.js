/**
 * API Proxy — proxies requests to external image/video generation APIs.
 * All API keys are loaded from ConfigManager, never exposed to frontend.
 */

class APIProxy {
  constructor(configManager) {
    this.config = configManager;
  }

  async callVideoAPI(platform, params) {
    const key = this.config.getPlatformKey(platform);
    if (!key) throw new Error(`No API key configured for platform: ${platform}`);
    switch (platform) {
      case 'seedance': return this._callSeedance(key, params);
      case 'runway': return this._callRunway(key, params);
      case 'kling': return this._callKling(key, params);
      case 'luma': return this._callLuma(key, params);
      case 'pika': return this._callPika(key, params);
      default: throw new Error(`Unknown video platform: ${platform}`);
    }
  }

  async pollVideoTask(platform, taskId, maxRetries = 60, interval = 5000) {
    const key = this.config.getPlatformKey(platform);
    for (let i = 0; i < maxRetries; i++) {
      const result = await this._pollTask(platform, key, taskId);
      if (result.status === 'completed' || result.status === 'failed') return result;
      await this._sleep(interval);
    }
    throw new Error(`Task ${taskId} timed out after ${maxRetries * interval}ms`);
  }

  async callImageAPI(platform, params) {
    const key = this.config.getPlatformKey(platform);
    if (!key) throw new Error(`No API key configured for image platform: ${platform}`);
    switch (platform) {
      case 'gpt_image': return this._callDALLE(key, params);
      case 'flux': return this._callReplicate(key, 'flux', params);
      case 'ideogram': return this._callIdeogram(key, params);
      case 'nano_banana': return this._callNanoBanana(key, params);
      default: throw new Error(`Unknown image platform: ${platform}`);
    }
  }

  async _callSeedance(key, params) {
    const endpoint = this.config.get('platforms.seedance.endpoint') || 'https://ark.cn-beijing.volces.com/api/v1/video/generation';
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: params.prompt, reference_images: params.referenceImages || [], duration: params.duration || 15, aspect_ratio: params.aspectRatio || '16:9' })
    });
    if (!resp.ok) throw new Error(`Seedance API error: ${await resp.text()}`);
    return (await resp.json()).task_id;
  }

  async _callRunway(key, params) {
    const resp = await fetch('https://api.runwayml.com/v1/generate', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: params.prompt, image_url: params.imageUrl, duration: params.duration || 4, model: 'gen4' })
    });
    if (!resp.ok) throw new Error(`Runway API error: ${await resp.text()}`);
    return (await resp.json()).id;
  }

  async _callKling(key, params) {
    const resp = await fetch('https://api.kling.kuaishou.com/v1/video/generate', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: params.prompt, first_frame: params.firstFrame, duration: params.duration || 5 })
    });
    if (!resp.ok) throw new Error(`Kling API error: ${await resp.text()}`);
    return (await resp.json()).data.task_id;
  }

  async _callLuma(key, params) {
    const resp = await fetch('https://api.lumalabs.ai/dream-machine/v1/generations', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: params.prompt, keyframes: params.keyframes || {}, aspect_ratio: params.aspectRatio || '16:9' })
    });
    if (!resp.ok) throw new Error(`Luma API error: ${await resp.text()}`);
    return (await resp.json()).id;
  }

  async _callPika(key, params) {
    const resp = await fetch('https://queue.fal.run/fal-ai/pika', {
      method: 'POST',
      headers: { 'Authorization': `Key ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: params.prompt, image_url: params.imageUrl, duration: params.duration || 4 })
    });
    if (!resp.ok) throw new Error(`Pika API error: ${await resp.text()}`);
    return (await resp.json()).request_id;
  }

  async _callDALLE(key, params) {
    const resp = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'dall-e-3', prompt: params.prompt, n: 1, size: params.size || '1792x1024', quality: params.quality || 'standard' })
    });
    if (!resp.ok) throw new Error(`DALL-E API error: ${await resp.text()}`);
    return { url: (await resp.json()).data[0].url };
  }

  async _callReplicate(key, model, params) {
    const resp = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: { 'Authorization': `Token ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ version: params.version, input: { prompt: params.prompt } })
    });
    if (!resp.ok) throw new Error(`Replicate API error: ${await resp.text()}`);
    return await resp.json();
  }

  async _callIdeogram(key, params) {
    const resp = await fetch('https://api.ideogram.ai/generate', {
      method: 'POST',
      headers: { 'Api-Key': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_request: { prompt: params.prompt, aspect_ratio: params.aspectRatio || 'ASPECT_16_9', model: 'V_2' } })
    });
    if (!resp.ok) throw new Error(`Ideogram API error: ${await resp.text()}`);
    return { url: (await resp.json()).data[0].url };
  }

  async _callNanoBanana(key, params) {
    const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: params.prompt }] }], generationConfig: { responseModalities: ['TEXT', 'IMAGE'] } })
    });
    if (!resp.ok) throw new Error(`Gemini API error: ${await resp.text()}`);
    return await resp.json();
  }

  async _pollTask(platform, key, taskId) {
    const endpoints = {
      seedance: `https://ark.cn-beijing.volces.com/api/v1/video/tasks/${taskId}`,
      runway: `https://api.runwayml.com/v1/tasks/${taskId}`,
      kling: `https://api.kling.kuaishou.com/v1/video/task/${taskId}`,
      luma: `https://api.lumalabs.ai/dream-machine/v1/generations/${taskId}`,
      pika: `https://queue.fal.run/fal-ai/pika/requests/${taskId}/status`
    };
    const resp = await fetch(endpoints[platform], { headers: { 'Authorization': `Bearer ${key}` } });
    if (!resp.ok) return { status: 'polling' };
    return this._normalizePollResponse(platform, await resp.json());
  }

  _normalizePollResponse(platform, data) {
    const map = {
      seedance: () => ({ status: data.status === 'succeeded' ? 'completed' : data.status === 'failed' ? 'failed' : 'processing', result: data.video_url ? { videoUrl: data.video_url } : undefined }),
      runway: () => ({ status: data.status === 'SUCCEEDED' ? 'completed' : data.status === 'FAILED' ? 'failed' : 'processing', result: data.output?.video ? { videoUrl: data.output.video } : undefined }),
      kling: () => ({ status: data.data?.status === 'completed' ? 'completed' : data.data?.status === 'failed' ? 'failed' : 'processing', result: data.data?.video_url ? { videoUrl: data.data.video_url } : undefined }),
      luma: () => ({ status: data.state === 'completed' ? 'completed' : data.state === 'failed' ? 'failed' : 'processing', result: data.assets?.video ? { videoUrl: data.assets.video } : undefined }),
      pika: () => ({ status: data.status === 'COMPLETED' ? 'completed' : data.status === 'FAILED' ? 'failed' : 'processing', result: data.output?.video?.url ? { videoUrl: data.output.video.url } : undefined })
    };
    return (map[platform] || (() => ({ status: 'processing' })))();
  }

  _sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
}

module.exports = APIProxy;

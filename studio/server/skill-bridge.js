class SkillBridge {
  constructor(options = {}) {
    this.onRequest = options.onRequest || (() => {});
    this.pendingRequests = new Map();
  }

  async request(options) {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    this.pendingRequests.set(requestId, { ...options, requestId, status: 'pending', createdAt: Date.now() });
    this.onRequest({ requestId, ...options });
    return requestId;
  }

  resolve(requestId, result) {
    const req = this.pendingRequests.get(requestId);
    if (req) { req.status = 'completed'; req.result = result; req.completedAt = Date.now(); }
    return req;
  }

  getStatus(requestId) { return this.pendingRequests.get(requestId) || null; }
}

module.exports = SkillBridge;

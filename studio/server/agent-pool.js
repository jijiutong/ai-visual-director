class AgentPool {
  constructor(options = {}) {
    this.vaultReader = options.vaultReader;
    this.configManager = options.configManager;
    this.apiProxy = options.apiProxy;
    this.skillBridge = options.skillBridge;
    this.onProgress = options.onProgress || (() => {});
    this.running = new Map();
  }

  async execute(plan, context) {
    const results = {};
    for (const group of plan.groups) {
      if (group.length > 1) {
        const promises = group.map(nodeId =>
          this._runNode(nodeId, plan.nodeMap[nodeId], context, results)
            .then(r => ({ nodeId, result: r, error: null }))
            .catch(e => ({ nodeId, result: null, error: e.message })));
        for (const gr of await Promise.all(promises)) results[gr.nodeId] = gr.error ? { error: gr.error } : gr.result;
      } else {
        const nodeId = group[0];
        try { results[nodeId] = await this._runNode(nodeId, plan.nodeMap[nodeId], context, results); }
        catch (e) { results[nodeId] = { error: e.message }; }
      }
    }
    return results;
  }

  async _runNode(nodeId, node, context, prev) {
    this.running.set(nodeId, { status: 'running', startedAt: Date.now() });
    this.onProgress({ nodeId, status: 'running', label: node.label });
    try {
      const result = await this._executeByType(node.type, node.params || {}, context, prev);
      this.running.set(nodeId, { status: 'completed', result });
      this.onProgress({ nodeId, status: 'completed', label: node.label, result });
      return result;
    } catch (e) {
      this.running.set(nodeId, { status: 'failed', error: e.message });
      this.onProgress({ nodeId, status: 'failed', label: node.label, error: e.message });
      throw e;
    }
  }

  async _executeByType(type, params, context, prev) {
    switch (type) {
      case 'obsidian_read': return this._execObsidianRead(params, context);
      case 'paste_story': return { content: params.content || context.pastedStory || '' };
      case 'extract_all': {
        const src = prev['obsidian_read'] || prev['read'] || { content: context.pastedStory || '' };
        return { storyContent: typeof src === 'string' ? src : (src.content || ''), extracted: true };
      }
      case 'extract_character': {
        const src = prev['obsidian_read'] || prev['read'] || { content: context.pastedStory || '' };
        return { storyContent: typeof src === 'string' ? src : (src.content || ''), focus: 'character' };
      }
      case 'generate_character': case 'generate_character_sheet': case 'generate_turnaround':
      case 'generate_expressions': case 'generate_scene': case 'generate_storyboard':
      case 'generate_full_board': case 'generate_poster': case 'generate_moodboard':
        return this._buildGenerateResult(type, params, context, prev);
      case 'merge_frames':
        return { label: '合并帧', note: '将分镜帧合并为视频参考图' };
      case 'video_prompt': {
        const storyContent = this._getStoryContent(context, prev);
        return { label: '视频 Prompt', mode: params.mode || 'compressed', hasContent: !!storyContent };
      }
      case 'call_video_api':
        if (this.apiProxy) {
          const platform = params.platform || context.platform || 'seedance';
          const promptText = (prev['video_prompt'] || prev['prompt'] || {}).prompt || params.prompt || '';
          try {
            const taskId = await this.apiProxy.callVideoAPI(platform, { prompt: promptText, duration: context.duration || 15, aspectRatio: context.aspectRatio || '16:9' });
            return { platform, taskId, status: 'submitted' };
          } catch (e) { return { platform, error: e.message }; }
        }
        return { platform: params.platform || 'seedance', note: 'Pending API call' };
      case 'export':
        return { outputDir: params.output_dir || context.outputDir || '产物', exportedNodes: Object.keys(prev) };
      default: throw new Error(`Unknown node type: ${type}`);
    }
  }

  _getStoryContent(context, prev) {
    for (const key of ['obsidian_read', 'read', 'paste', 'paste_story']) {
      const v = prev[key];
      if (v) return typeof v === 'string' ? v : (v.content || v.storyContent || '');
    }
    return context.pastedStory || '';
  }

  _buildGenerateResult(type, params, context, prev) {
    const story = this._getStoryContent(context, prev);
    const style = context.style || 'auto';
    const labelMap = {
      generate_character: '角色设定卡', generate_character_sheet: '角色设定卡', generate_turnaround: '角色三视图',
      generate_expressions: '12表情图', generate_scene: '场景概念卡', generate_storyboard: '故事板分镜',
      generate_full_board: '全案板', generate_poster: '电影海报', generate_moodboard: '情绪板'
    };
    return {
      label: labelMap[type] || type,
      style, aspectRatio: context.aspectRatio || '16:9',
      shots: context.shotCount || 7,
      hasStory: !!story
    };
  }

  async _execObsidianRead(params, context) {
    if (!this.vaultReader) return { content: context.pastedStory || '', note: 'No VaultReader' };
    const projectDir = context.chapterPath || params.path;
    if (!projectDir) throw new Error('No Obsidian path');
    const project = this.vaultReader.scanProject(projectDir);
    const chapter = project.chapters[0];
    if (!chapter) return { content: context.pastedStory || '', characters: project.characters, scenes: project.scenes };
    const data = this.vaultReader.readFile(chapter.path);
    return { chapter: chapter.name, content: data.content, frontmatter: data.frontmatter, characters: project.characters, scenes: project.scenes };
  }
}

module.exports = AgentPool;

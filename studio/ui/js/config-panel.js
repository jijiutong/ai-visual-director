// config-panel.js — visual config.yml editor
class ConfigPanel {
  async render() {
    const container = document.getElementById('configPanelContainer');
    if (!container) return;

    let config;
    try { config = await api.getConfig(); }
    catch (e) { config = { platforms: {}, image_platforms: {}, defaults: {}, preferences: {} }; }

    const currentTheme = document.documentElement.dataset.theme || 'dark';
    container.innerHTML = `
      <div class="config-panel">
        <h2>⚙️ 配置</h2>
        <p class="config-path">config.yml → Obsidian Vault 根目录</p>

        <section class="config-section">
          <h3>🎨 界面主题</h3>
          <div style="display:flex;gap:12px">
            <label class="theme-option ${currentTheme === 'dark' ? 'theme-active' : ''}" onclick="setTheme('dark')">
              <span class="theme-preview-dark"></span>
              <span>暗色</span>
            </label>
            <label class="theme-option ${currentTheme === 'light' ? 'theme-active' : ''}" onclick="setTheme('light')">
              <span class="theme-preview-light"></span>
              <span>白色</span>
            </label>
          </div>
        </section>

        <section class="config-section">
          <h3>📁 Obsidian Vault 路径</h3>
          <div class="config-field">
            <label>Vault 根目录（故事/角色/场景都在这里）</label>
            <input type="text" id="cfg-vault-path" value="${config.vault_path || config.defaults?.vault_path || ''}" placeholder="/Users/xxx/Obsidian/我的小说" />
          </div>
          <p style="font-size:11px;color:var(--text-dim);margin-top:4px">修改后需重启服务生效。留空则使用当前工作目录。</p>
        </section>

        <section class="config-section">
          <h3>🎥 视频平台 API Key</h3>
          ${['seedance', 'runway', 'kling', 'luma', 'pika'].map(k => `
            <div class="config-field">
              <label>${k}</label>
              <input type="password" id="cfg-video-${k}" placeholder="${config.platforms?.[k]?.key ? '••••••••' : '未配置'}" />
            </div>
          `).join('')}
        </section>

        <section class="config-section">
          <h3>🖼 图片平台 API Key</h3>
          ${['gpt_image', 'flux', 'ideogram', 'nano_banana'].map(k => `
            <div class="config-field">
              <label>${k}</label>
              <input type="password" id="cfg-img-${k}" placeholder="${config.image_platforms?.[k]?.key ? '••••••••' : '未配置'}" />
            </div>
          `).join('')}
        </section>

        <section class="config-section">
          <h3>默认参数</h3>
          ${[
            { k: 'aspect_ratio', label: '默认画幅', val: config.defaults?.aspect_ratio || '16:9' },
            { k: 'duration', label: '默认时长（秒）', val: config.defaults?.duration || 15 },
            { k: 'shots_per_15s', label: '每15秒分镜数', val: config.defaults?.shots_per_15s || 7 },
            { k: 'output_dir', label: '产物目录', val: config.defaults?.output_dir || '产物' }
          ].map(f => `
            <div class="config-field">
              <label>${f.label}</label>
              <input type="text" id="cfg-default-${f.k}" value="${f.val}" />
            </div>
          `).join('')}
        </section>

        <button class="btn-save" id="cfgSaveBtn">💾 保存配置</button>
      </div>
    `;

    document.getElementById('cfgSaveBtn').onclick = async () => {
      const updated = { platforms: {}, image_platforms: {}, defaults: {} };
      const vaultEl = document.getElementById('cfg-vault-path');
      if (vaultEl && vaultEl.value) updated.vault_path = vaultEl.value;

      ['seedance', 'runway', 'kling', 'luma', 'pika'].forEach(k => {
        const el = document.getElementById(`cfg-video-${k}`);
        if (el && el.value) updated.platforms[k] = { key: el.value };
      });
      ['gpt_image', 'flux', 'ideogram', 'nano_banana'].forEach(k => {
        const el = document.getElementById(`cfg-img-${k}`);
        if (el && el.value) updated.image_platforms[k] = { key: el.value };
      });
      ['aspect_ratio', 'duration', 'shots_per_15s', 'output_dir'].forEach(k => {
        const el = document.getElementById(`cfg-default-${k}`);
        if (el && el.value) updated.defaults[k] = isNaN(el.value) ? el.value : parseInt(el.value);
      });

      try {
        await api.updateConfig(updated);
        showToast('✅ 配置已保存' + (updated.vault_path ? '（重启服务后 Vault 路径生效）' : ''));
      } catch (e) {
        showToast('❌ 保存失败: ' + e.message);
      }
    };
  }
}

window.configPanel = new ConfigPanel();

// app.js — main entry, tab switching
let currentTab = 'simple';

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

  const chatBar = document.getElementById('chatBarContainer');

  switch (tab) {
    case 'simple':
      document.getElementById('simpleViewContainer').classList.add('active');
      if (window.simpleView) window.simpleView.render();
      if (chatBar) chatBar.style.display = 'none';
      break;
    case 'pro':
      document.getElementById('proViewContainer').classList.add('active');
      if (window.proView) window.proView.render();
      if (chatBar) chatBar.style.display = 'flex';
      break;
    case 'config':
      document.getElementById('configPanelContainer').classList.add('active');
      if (window.configPanel) window.configPanel.render();
      if (chatBar) chatBar.style.display = 'none';
      break;
  }
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  switchTab('simple');
});

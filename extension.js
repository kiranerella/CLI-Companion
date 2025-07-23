const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const os = require('os');
const cliCommands = require('./cliCommands/index');

const FAVORITES_KEY = 'cliCompanion.favorites';

function activate(context) {
  console.log('🚀 CLI Companion Activated');

  const globalState = context.globalState;
  const favorites = new Set(globalState.get(FAVORITES_KEY, []));

  function saveFavorites() {
    globalState.update(FAVORITES_KEY, Array.from(favorites));
  }

  const showCLICommand = vscode.commands.registerCommand('cliCompanion.showCLI', () => {
    const panel = vscode.window.createWebviewPanel(
      'cliCLI',
      '🧭 CLI Companion',
      vscode.ViewColumn.One,
      { enableScripts: true, retainContextWhenHidden: true }
    );
    panel.webview.html = getWebviewContent(cliCommands, favorites);
    setupWebviewListeners(panel, favorites, saveFavorites, cliCommands);
  });

  const showFloatingCommand = vscode.commands.registerCommand('cliCompanion.showFloating', () => {
    const panel = vscode.window.createWebviewPanel(
      'cliFloating',
      '🧊 CLI Companion (Floating)',
      vscode.ViewColumn.Beside,
      { enableScripts: true, retainContextWhenHidden: true }
    );
    panel.webview.html = getWebviewContent(cliCommands, favorites);
    setupWebviewListeners(panel, favorites, saveFavorites, cliCommands);
  });

  const quickSelectCommand = vscode.commands.registerCommand('cliCompanion.quickSelect', async () => {
    const items = cliCommands.map(cmd => ({
      label: cmd.label,
      description: cmd.command,
      detail: cmd.category,
      cmd: cmd.command
    }));
    const selected = await vscode.window.showQuickPick(items, {
      placeHolder: 'Select a CLI command'
    });
    if (selected) {
      await vscode.env.clipboard.writeText(selected.cmd);
      vscode.window.showInformationMessage(`📋 Copied: ${selected.cmd}`);
    }
  });

  context.subscriptions.push(showCLICommand, showFloatingCommand, quickSelectCommand);
}

function setupWebviewListeners(panel, favorites, saveFavorites, cliCommands) {
  panel.webview.onDidReceiveMessage(message => {
    switch (message.command) {
      case 'copy':
        vscode.env.clipboard.writeText(message.text);
        panel.webview.postMessage({ command: 'copied' });
        break;
      case 'toggleFavorite':
        if (favorites.has(message.commandText)) {
          favorites.delete(message.commandText);
        } else {
          favorites.add(message.commandText);
        }
        saveFavorites();
        panel.webview.postMessage({
          command: 'favoritesUpdated',
          favorites: Array.from(favorites)
        });
        break;
      case 'exportFavorites':
        const favCommands = cliCommands.filter(cmd => favorites.has(cmd.command));
        const markdown = favCommands.map(cmd => `### ${cmd.label}\n\`\`\`\n${cmd.command}\n\`\`\`\n`).join('\n');
        const filePath = path.join(os.tmpdir(), 'cli_favorites.md');
        fs.writeFileSync(filePath, markdown);
        vscode.window.showInformationMessage('✅ Favorites exported.', 'Open File').then(choice => {
          if (choice === 'Open File') {
            vscode.commands.executeCommand('vscode.open', vscode.Uri.file(filePath));
          }
        });
        break;
    }
  });
}

function getWebviewContent(commands, favoritesSet) {
  const commandsJSON = JSON.stringify(commands);
  const favoritesJSON = JSON.stringify(Array.from(favoritesSet));
  const tags = Array.from(new Set(commands.flatMap(cmd => cmd.tags || []))).sort();
  const tagsHTML = tags.map(tag => `<button class="tag-btn" data-tag="${tag}">${tag}</button>`).join('');

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: sans-serif;
        padding: 1rem;
        background: #1e1e1e;
        color: white;
      }
      .command {
        background: #333;
        padding: 10px;
        margin: 8px 0;
        border-radius: 6px;
        position: relative;
      }
      .command:hover {
        background: #444;
      }
      .actions {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
      }
      .favorite-btn {
        cursor: pointer;
        float: right;
        color: gold;
      }
      .favorite-btn.inactive {
        color: gray;
      }
      button {
        background: #007acc;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
      }
      button:hover {
        background: #005f99;
      }
      .tag-bar {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 10px 0 16px;
      }
      .tag-btn {
        background: #444;
        color: white;
        padding: 4px 10px;
        border-radius: 20px;
        cursor: pointer;
      }
      .tag-btn.active {
        background: gold;
        color: black;
      }
    </style>
  </head>
  <body>
    <h1>⭐ CLI Companion</h1>
    <div class="tag-bar">${tagsHTML}</div>
    <div class="actions">
      <button onclick="exportFavorites()">📤 Export Favorites</button>
    </div>
    <div id="commands"></div>

    <script>
      const vscode = acquireVsCodeApi();
      const commands = ${commandsJSON};
      let favorites = new Set(${favoritesJSON});
      let selectedTag = null;

      document.querySelectorAll('.tag-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const tag = btn.dataset.tag;
          if (selectedTag === tag) {
            selectedTag = null;
            btn.classList.remove('active');
          } else {
            selectedTag = tag;
            document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
          }
          renderCommands();
        });
      });

      function renderCommands() {
        const container = document.getElementById('commands');
        container.innerHTML = '';
        commands.forEach(cmd => {
          const tagMatch = !selectedTag || (cmd.tags && cmd.tags.includes(selectedTag));
          if (!tagMatch) return;
          const div = document.createElement('div');
          div.className = 'command';
          div.innerHTML = \`
            <strong>\${cmd.label}</strong>
            <div>\${cmd.command}</div>
            <span class="favorite-btn \${favorites.has(cmd.command) ? '' : 'inactive'}"
              onclick="toggleFavorite('\${cmd.command}')">\${favorites.has(cmd.command) ? '★' : '☆'}</span>
            <button onclick="copyCommand('\${cmd.command}')">📋 Copy</button>
          \`;
          container.appendChild(div);
        });
      }

      function copyCommand(cmd) {
        vscode.postMessage({ command: 'copy', text: cmd });
      }

      function toggleFavorite(cmd) {
        vscode.postMessage({ command: 'toggleFavorite', commandText: cmd });
      }

      function exportFavorites() {
        vscode.postMessage({ command: 'exportFavorites' });
      }

      window.addEventListener('message', event => {
        const msg = event.data;
        if (msg.command === 'favoritesUpdated') {
          favorites = new Set(msg.favorites);
          renderCommands();
        }
        if (msg.command === 'copied') {
          alert('📋 Copied to clipboard!');
        }
      });

      renderCommands();
    </script>
  </body>
  </html>`;
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};

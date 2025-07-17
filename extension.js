const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const cliCommands = require('./cliCommands/index'); // ✅ Moved to global

function activate(context) {
  console.log('🚀 CLI Companion is now active!');

  // 📌 Command: CLI Palette View
  const showCLICommand = vscode.commands.registerCommand('cliCompanion.showCLI', () => {
    const panel = vscode.window.createWebviewPanel(
      'cliCompanion',
      '🧭 CLI Companion',
      { viewColumn: vscode.ViewColumn.Beside, preserveFocus: true },
      {
        enableScripts: true,
        retainContextWhenHidden: true
      }
    );

    panel.webview.html = getWebviewContent(cliCommands);

    panel.webview.onDidReceiveMessage(
      message => {
        if (message.command === 'copy') {
          vscode.env.clipboard.writeText(message.text);
          panel.webview.postMessage({ command: 'copied' });
        }
      },
      undefined,
      context.subscriptions
    );
  });

  // 📌 Command: Floating UI
  const showFloatingCommand = vscode.commands.registerCommand('cliCompanion.showFloating', () => {
    const panel = vscode.window.createWebviewPanel(
      'cliFloating',
      '🧊 CLI Companion (Floating)',
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
        retainContextWhenHidden: true
      }
    );

    panel.webview.html = getWebviewContent(cliCommands);

    panel.webview.onDidReceiveMessage(
      message => {
        if (message.command === 'copy') {
          vscode.env.clipboard.writeText(message.text);
          panel.webview.postMessage({ command: 'copied' });
        }
      },
      undefined,
      context.subscriptions
    );
  });

  context.subscriptions.push(showCLICommand, showFloatingCommand);
}

function getWebviewContent(commands) {
  const commandsJSON = JSON.stringify(commands);

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>CLI Companion</title>
    <style>
      body {
        margin: 0;
        padding: 12px;
        font-family: 'Segoe UI', sans-serif;
        background: transparent;
        color: #ffffff;
        backdrop-filter: blur(6px);
      }

      .glass {
        background: rgba(0, 0, 0, 0.45);
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      h1 {
        margin-top: 0;
        font-size: 1.6rem;
        color: #f7f7f7;
      }

      #searchInput {
        width: 100%;
        padding: 10px;
        margin-bottom: 18px;
        font-size: 1rem;
        border-radius: 8px;
        border: none;
        background: rgba(255, 255, 255, 0.1);
        color: white;
      }

      .category {
        font-size: 1.1rem;
        margin: 24px 0 10px;
        font-weight: bold;
        color: #ffd700;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding-bottom: 4px;
      }

      .command {
        padding: 10px 14px;
        margin: 6px 0;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s ease;
        white-space: pre-wrap;
        word-break: break-word;
      }

      .command:hover {
        background: rgba(255, 255, 255, 0.15);
      }
    </style>
  </head>
  <body>
    <div class="glass">
      <h1>🚀 CLI Companion</h1>
      <input type="text" id="searchInput" placeholder="Search commands or tags..." />
      <div id="commandsContainer"></div>
    </div>

    <script>
      const vscode = acquireVsCodeApi();
      const allCommands = ${commandsJSON};

      function renderCommands(filter = '') {
        const container = document.getElementById('commandsContainer');
        container.innerHTML = '';

        const grouped = {};
        allCommands.forEach(cmd => {
          if (!cmd.category) return;
          if (!grouped[cmd.category]) grouped[cmd.category] = [];
          if (
            cmd.label.toLowerCase().includes(filter.toLowerCase()) ||
            cmd.command.toLowerCase().includes(filter.toLowerCase()) ||
            (cmd.tags && cmd.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase())))
          ) {
            grouped[cmd.category].push(cmd);
          }
        });

        for (const cat in grouped) {
          const catHeader = document.createElement('div');
          catHeader.className = 'category';
          catHeader.textContent = cat;
          container.appendChild(catHeader);

          grouped[cat].forEach(cmd => {
            const cmdDiv = document.createElement('div');
            cmdDiv.className = 'command';
            cmdDiv.textContent = cmd.label + " → " + cmd.command;
            cmdDiv.onclick = () => {
              vscode.postMessage({ command: 'copy', text: cmd.command });
            };
            container.appendChild(cmdDiv);
          });
        }
      }

      document.getElementById('searchInput').addEventListener('input', e => {
        renderCommands(e.target.value);
      });

      renderCommands();

      window.addEventListener('message', event => {
        if (event.data.command === 'copied') {
          alert('📋 Copied to clipboard!');
        }
      });
    </script>
  </body>
  </html>`;
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
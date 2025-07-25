const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const os = require('os');
const cliCommands = require('./cliCommands');
const FAVORITES_KEY = 'cliCompanion.favorites';

function activate(context) {
  console.log('🚀 CLI Companion Activated');

  const globalState = context.globalState;
  const favorites = new Set(globalState.get(FAVORITES_KEY, []));

  function saveFavorites() {
    globalState.update(FAVORITES_KEY, Array.from(favorites));
  }

  function loadWebviewHtml(extensionUri) {
    const webviewPath = path.join(extensionUri.fsPath, 'media', 'webview.html');
    return fs.readFileSync(webviewPath, 'utf-8');
  }

  function showWebview(title, column) {
    const panel = vscode.window.createWebviewPanel(
      'cliCompanion',
      title,
      column,
      { enableScripts: true, retainContextWhenHidden: true }
    );

    let html = loadWebviewHtml(context.extensionUri);
    html = html
      .replace('{{commands}}', JSON.stringify(cliCommands))
      .replace('{{favorites}}', JSON.stringify(Array.from(favorites)))
      .replace('{{tags}}', JSON.stringify(Array.from(new Set(cliCommands.flatMap(cmd => cmd.tags || []))).sort()));
    panel.webview.html = html;

    setupWebviewListeners(panel, favorites, saveFavorites, cliCommands);
  }

  const showCLICommand = vscode.commands.registerCommand('cliCompanion.showCLI', () =>
    showWebview('🧭 CLI Companion', vscode.ViewColumn.One)
  );

  const showFloatingCommand = vscode.commands.registerCommand('cliCompanion.showFloating', () =>
    showWebview('🧊 CLI Companion (Floating)', vscode.ViewColumn.Beside)
  );

  const quickSelectCommand = vscode.commands.registerCommand('cliCompanion.quickSelect', async () => {
    const items = cliCommands.map(cmd => ({
      label: cmd.label,
      description: cmd.command,
      detail: cmd.category,
      cmd: cmd.command
    }));
    const selected = await vscode.window.showQuickPick(items, { placeHolder: 'Select a CLI command' });
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

function deactivate() {}

module.exports = { activate, deactivate };

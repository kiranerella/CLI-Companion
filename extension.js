const vscode = require('vscode');
const cliCommands = require('./cliCommands');

function activate(context) {
  console.log('🚀 CLI Companion is now active!');

  const showCLICmd = vscode.commands.registerCommand('cliCompanion.showCLI', async () => {
    const selected = await vscode.window.showQuickPick(
      cliCommands.map(cmd => ({
        label: cmd.label,
        description: cmd.command
      })),
      { placeHolder: "Search CLI commands..." }
    );

    if (selected) {
      await vscode.env.clipboard.writeText(selected.description);
      vscode.window.showInformationMessage(`📋 Copied to clipboard: ${selected.description}`);
    }
  });

  context.subscriptions.push(showCLICmd);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};

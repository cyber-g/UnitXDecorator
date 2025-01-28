// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Define the regex for the decorator
	const unitRegex = /([+-]?\d+(?:[.,]\d+)?)\s*([\w\\\/.{}^_\-\[\] ]+)/g;

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('unitxdecorator.decorateUnits', () => {
		// Get the active text editor
		const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("No active editor found!");
            return;
        }

		// Get selections, if none, show an error message
		const selections = editor.selections
		if (selections.length === 0) {
			vscode.window.showErrorMessage("Please select some text to decorate the units!");
			return;
		}
		// print a message to the console to show that the command is working : the number of selections
		console.log(`Decorating ${selections.length} selections`);

		// Get the document and the text of the document
		const document = editor.document;

		editor.edit(editBuilder => {
			// For each selection
			for (const selection of selections) {
				// Get the text of the selection
				const selectedText = document.getText(selection);
				// Get the text of the selection
				const newText = selectedText.replace(unitRegex, '\\SI{$1}{$2}');
				// Replace the text of the selection with the new text
				editBuilder.replace(selection, newText);
			}
		});

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

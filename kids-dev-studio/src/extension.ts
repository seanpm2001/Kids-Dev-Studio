// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { DepNodeProvider } from './nodeDependencies';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const nodeDependenciesProvider = new DepNodeProvider("../kids-dev-studio/");
	vscode.window.registerTreeDataProvider('saveFile', nodeDependenciesProvider);

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "kids-dev-studio" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.kidsDevStudio', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		if (vscode.workspace.rootPath !== undefined){

		vscode.window.showInformationMessage('Welcome to Kids Dev Studio!');
		}
		else {
			vscode.window.showInformationMessage('Sorry Kids Dev Studio could not be loaded!');
		}
	});

	context.subscriptions.push(disposable);

	let commandArray = [
        //name in package.json , name of command to execute
        ["extension.save", "workbench.action.files.save"],
    ];

    let disposableCommandsArray: vscode.Disposable[] = [];
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    commandArray.forEach(command => {

        disposableCommandsArray.push(vscode.commands.registerCommand(command[0], () => {
            vscode.commands.executeCommand(command[1]).then(function () {
            });
        }));
	});
	
	disposableCommandsArray.forEach(i => {
        context.subscriptions.push(i);
    });

}

// this method is called when your extension is deactivated
export function deactivate() {}

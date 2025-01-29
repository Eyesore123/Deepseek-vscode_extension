import * as vscode from 'vscode';
import ollama from 'ollama';

let webviewPanel: vscode.WebviewPanel | undefined;

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "deepseek" is now active!');

    const disposable = vscode.commands.registerCommand('deepseek.startdeepseek', () => {
        if (!webviewPanel) {
            webviewPanel = vscode.window.createWebviewPanel(
                'deepseek-chat',
                'Deepseek Chat',
                vscode.ViewColumn.One,
                { enableScripts: true }
            );

            webviewPanel.webview.html = getWebViewContent();

            console.log('Panel created:', webviewPanel);

            webviewPanel.onDidDispose(() => {
                webviewPanel = undefined;
            });

            webviewPanel.webview.onDidReceiveMessage(async (message: any) => {
                if (message.command === 'chat') {
                    const userPrompt = message.text;
                    let responseText = '';

                    try {
                        const streamResponse = await ollama.chat({
                            model: 'deepseek-r1:latest',
                            messages: [{ role: 'user', content: userPrompt }],
                            stream: true
                        });

                        for await (const part of streamResponse) {
                            responseText += part.message.content;
                            webviewPanel?.webview.postMessage({ command: 'chatResponse', text: responseText });
                        }
                    } catch (err) {
                        webviewPanel?.webview.postMessage({ command: 'chatResponse', text: `Error: ${String(err)}` });
                    }
                }
            });
        } else {
            webviewPanel.reveal(vscode.ViewColumn.One);
        }
    });

    context.subscriptions.push(disposable);
}

function getWebViewContent(): string {
    return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <style>
            body { font-family: sans-serif; margin: 1rem; }
            #prompt { width: 100%; box-sizing: border-box; }
            #response { border: 1px solid #ccc; margin-top: 1rem; padding: 0.5rem; min-height: fit-content; }
        </style>
    </head>
    <body>
        <h2>Deepseek extension</h2>
        <textarea id="prompt" rows="3" placeholder="Ask something"></textarea><br>
        <button id="askBtn">Ask</button>
        <div id="response"></div>

        <script>
            const vscode = acquireVsCodeApi();

            document.getElementById('askBtn').addEventListener('click', () => {
                const text = document.getElementById('prompt').value;
                vscode.postMessage({ command: 'chat', text: text });
            });

            window.addEventListener('message', event => {
                const message = event.data;
                if (message.command === 'chatResponse') {
                    document.getElementById('response').innerText = message.text;
                }
            });
        </script>
    </body>
    </html>`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
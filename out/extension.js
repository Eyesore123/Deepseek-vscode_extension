"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const ollama_1 = __importDefault(require("ollama"));
let webviewPanel;
function activate(context) {
    console.log('Congratulations, your extension "deepseek" is now active!');
    const disposable = vscode.commands.registerCommand('deepseek.startdeepseek', () => {
        if (!webviewPanel) {
            webviewPanel = vscode.window.createWebviewPanel('deepseek-chat', 'Deepseek Chat', vscode.ViewColumn.One, { enableScripts: true });
            webviewPanel.webview.html = getWebViewContent();
            console.log('Panel created:', webviewPanel);
            webviewPanel.onDidDispose(() => {
                webviewPanel = undefined;
            });
            webviewPanel.webview.onDidReceiveMessage(async (message) => {
                if (message.command === 'chat') {
                    const userPrompt = message.text;
                    let responseText = '';
                    try {
                        const streamResponse = await ollama_1.default.chat({
                            model: 'deepseek-r1:latest',
                            messages: [{ role: 'user', content: userPrompt }],
                            stream: true
                        });
                        for await (const part of streamResponse) {
                            responseText += part.message.content;
                            webviewPanel?.webview.postMessage({ command: 'chatResponse', text: responseText });
                        }
                    }
                    catch (err) {
                        webviewPanel?.webview.postMessage({ command: 'chatResponse', text: `Error: ${String(err)}` });
                    }
                }
            });
        }
        else {
            webviewPanel.reveal(vscode.ViewColumn.One);
        }
    });
    context.subscriptions.push(disposable);
}
function getWebViewContent() {
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
function deactivate() { }
//# sourceMappingURL=extension.js.map
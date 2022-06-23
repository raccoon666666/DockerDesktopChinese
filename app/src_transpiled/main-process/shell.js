"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerShellIpcHandlers = void 0;
const electron_1 = require("electron");
const url_1 = require("url");
function registerShellIpcHandlers() {
    electron_1.ipcMain.handle('open-external', (_, url) => {
        const parsedUrl = new url_1.URL(url);
        if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
            throw new Error(`The url "${url}" is not valid. The supported protocols are "http://" and "https://."`);
        }
        electron_1.shell.openExternal(url);
    });
}
exports.registerShellIpcHandlers = registerShellIpcHandlers;

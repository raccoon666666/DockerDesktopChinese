"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerToastHandlers = void 0;
// eslint-disable-next-line import/no-extraneous-dependencies
const electron_1 = require("electron");
/**
 * When you receive a toast error, re-dispatch it to the sender's parent window
 * (allows embedded content to request their hosts show an error)
 */
function registerToastHandlers() {
    ['success', 'warning', 'error'].forEach((level) => {
        electron_1.ipcMain.handle(`display-toast-${level}`, async (event, message) => {
            const senderWindow = electron_1.BrowserWindow.fromWebContents(event.sender);
            if (!senderWindow) {
                throw new Error('WebContents are not attached to a window');
            }
            senderWindow.webContents.send(`display-toast-${level}`, message);
        });
    });
}
exports.registerToastHandlers = registerToastHandlers;

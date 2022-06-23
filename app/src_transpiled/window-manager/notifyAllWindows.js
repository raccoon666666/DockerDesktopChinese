"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyAllWindows = void 0;
const electron_1 = require("electron");
function notifyAllWindows(message) {
    log.info(`notification : ${JSON.stringify(message)}`);
    electron_1.BrowserWindow.getAllWindows().forEach((window) => window.webContents.send('notification', message));
}
exports.notifyAllWindows = notifyAllWindows;

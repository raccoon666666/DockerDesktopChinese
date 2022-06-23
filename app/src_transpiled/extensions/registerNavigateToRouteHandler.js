"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerNavigateToRouteHandlers = void 0;
// eslint-disable-next-line import/no-extraneous-dependencies
const electron_1 = require("electron");
function registerNavigateToRouteHandlers() {
    const handlers = {
        'navigate-to-containers': false,
        'navigate-to-container': true,
        'navigate-to-container-logs': true,
        'navigate-to-container-inspect': true,
        'navigate-to-container-stats': true,
        'navigate-to-images': false,
        'navigate-to-image': true,
        'navigate-to-volume': false,
        'navigate-to-volumes': false,
        'navigate-to-devenvs': false,
    };
    Object.entries(handlers).forEach(([k, v]) => {
        registerIPCHandler(k, v);
    });
}
exports.registerNavigateToRouteHandlers = registerNavigateToRouteHandlers;
function registerIPCHandler(channel, canThrowError) {
    electron_1.ipcMain.handle(channel, async (event, arg) => {
        const senderWindow = electron_1.BrowserWindow.fromWebContents(event.sender);
        if (!senderWindow) {
            throw new Error('WebContents are not attached to a window');
        }
        if (!canThrowError) {
            senderWindow.webContents.send(channel, arg);
            return new Promise((resolve) => {
                resolve({});
            });
        }
        return new Promise((resolve, reject) => {
            const replyChannel = `${channel}-reply-back-${arg.id}`;
            electron_1.ipcMain.once(replyChannel, (_event, status) => {
                if (status.error) {
                    reject(new Error(status.error));
                }
                else {
                    resolve({});
                }
            });
            senderWindow.webContents.send(channel, replyChannel, arg);
        });
    });
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerBackendAPIsIpcHandlers = void 0;
const electron_1 = require("electron");
const desktop_backend_1 = require("../api-client/desktop-backend");
const desktop_go_backend_1 = require("../api-client/desktop-go-backend");
const volume_contents_backend_1 = require("../api-client/volume-contents-backend");
function registerBackendAPIsIpcHandlers() {
    electron_1.ipcMain.handle('desktop-backend', (_, methodName, ...args) => {
        log.info(`received: desktop-backend, methodName: ${methodName}, args: ${JSON.stringify(args)}`);
        // @ts-expect-error
        return desktop_backend_1.desktopBackend[methodName](...args);
    });
    electron_1.ipcMain.handle('desktop-go-backend', (_, methodName, ...args) => {
        log.info(`received: desktop-go-backend, methodName: ${methodName}, args: ${JSON.stringify(args)}`);
        // @ts-expect-error
        return desktop_go_backend_1.desktopGoBackend[methodName](...args);
    });
    electron_1.ipcMain.handle('volume-contents-backend', (_, methodName, ...args) => {
        log.info(`received: volume-contents-backend, methodName: ${methodName}, args: ${JSON.stringify(args)}`);
        // @ts-expect-error
        return volume_contents_backend_1.volumeContentsBackend[methodName](...args);
    });
    electron_1.ipcMain.handle('show-login-dialog', () => {
        desktop_go_backend_1.desktopGoBackend.openBrowserForLogin();
    });
    electron_1.ipcMain.handle('dismiss-login-error', () => {
        desktop_go_backend_1.desktopGoBackend.dismissLoginError();
    });
}
exports.registerBackendAPIsIpcHandlers = registerBackendAPIsIpcHandlers;

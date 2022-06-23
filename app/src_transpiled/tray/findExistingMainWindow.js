"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findExistingMainWindow = exports.isMainWindow = void 0;
const electron_1 = require("electron");
// Main window is the one of dashboard/settings/troublesoot
// and their potential sub routes, like settings/general, settings/update
const MAIN_WINDOWS = [
    'dashboard',
    'settings',
    'troubleshoot',
    'containers',
    'tutorial',
];
function isMainWindow(name) {
    return MAIN_WINDOWS.some((mw) => name.startsWith(mw));
}
exports.isMainWindow = isMainWindow;
function findExistingMainWindow() {
    return electron_1.BrowserWindow.getAllWindows().find((window) => {
        return MAIN_WINDOWS.some((mw) => window.webContents.getURL().includes(mw));
    });
}
exports.findExistingMainWindow = findExistingMainWindow;

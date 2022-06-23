"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUIStateIpcHandlers = void 0;
const electron_1 = require("electron");
const electron_store_1 = __importDefault(require("electron-store"));
const store = new electron_store_1.default({ name: 'ui-state' });
function registerUIStateIpcHandlers() {
    electron_1.ipcMain.handle('ui-state-write', (_, storageKey, payload) => {
        try {
            // As of https://github.com/sindresorhus/conf/blob/main/source/index.ts#L451 this may throw
            store.set(storageKey, payload);
        }
        catch (e) {
            log.error(`Failed to store ui state on disk (${storageKey}).`);
        }
    });
    electron_1.ipcMain.handle('ui-state-read', () => {
        return store.store;
    });
}
exports.registerUIStateIpcHandlers = registerUIStateIpcHandlers;

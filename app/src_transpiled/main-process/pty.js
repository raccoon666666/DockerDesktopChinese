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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPtyIpcHandlers = void 0;
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
const nodePty = __importStar(require("node-pty"));
const bugsnag_1 = require("../service/bugsnag");
function registerPtyIpcHandlers() {
    let pty = null;
    electron_1.ipcMain.handle('init-pty', async (event) => {
        let exe;
        if (__DARWIN__ || __LINUX__) {
            exe = 'bash';
        }
        else {
            exe = path_1.default.resolve(process.env.windir, 'System32/WindowsPowerShell/v1.0/powershell.exe');
        }
        const argv = __DARWIN__ ? ['--login'] : [];
        pty = nodePty.spawn(exe, argv, {
            name: 'ansi',
            cols: 80,
            rows: 24,
            cwd: process.env[__DARWIN__ || __LINUX__ ? 'HOME' : 'USERPROFILE'],
            // @ts-expect-error
            env: process.env,
        });
        // @ts-expect-error
        const currentWindow = event.sender.getOwnerBrowserWindow();
        pty.on('data', (data) => {
            currentWindow?.webContents.send('write-data-term', data);
        });
        // @ts-expect-error
        pty.on('error', (error) => {
            bugsnag_1.bugsnagClient.notify(error, (e) => {
                e.context = 'pty';
            });
        });
    });
    electron_1.ipcMain.handle('resize-pty', (_, cols, rows) => {
        pty?.resize(cols, rows);
    });
    electron_1.ipcMain.handle('write-data-pty', (_, data) => {
        pty?.write(data);
    });
    electron_1.ipcMain.handle('kill-pty', () => {
        if (pty) {
            pty.kill();
        }
    });
}
exports.registerPtyIpcHandlers = registerPtyIpcHandlers;

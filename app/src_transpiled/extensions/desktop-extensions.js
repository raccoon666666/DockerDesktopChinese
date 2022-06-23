"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.desktopExtensionsBackend = void 0;
const electron_1 = require("electron");
const os_1 = __importDefault(require("os"));
const socket_client_1 = require("../api-client/socket-client");
const sse_1 = require("../sse/sse");
const retry_1 = require("../api-client/retry");
function getExtensionsManagerSocket() {
    switch (os_1.default.platform()) {
        case 'darwin':
            return 'extension-manager.sock';
        case 'win32':
            return '\\\\.\\pipe\\dockerExtensionManagerAPI';
        default:
            return `${os_1.default.homedir()}/.docker/desktop/extension-manager.sock`;
    }
}
class DesktopExtensionsBackend {
    constructor() {
        this.client = new socket_client_1.SocketClient({
            socketPath: getExtensionsManagerSocket(),
        });
    }
    getExtensions() {
        const extensions = this.client.get('/extensions?ignoreStatus=true');
        return extensions
            .then((ext) => {
            const result = ext.map((extension) => {
                const menu = {
                    title: extension.ui['dashboard-tab'].title,
                    src: extension.ui['dashboard-tab'].src,
                    debugMode: extension.ui['dashboard-tab'].debugMode,
                    updateInfo: extension.ui['dashboard-tab'].updateInfo,
                };
                const manifest = {
                    backend: {
                        socket: extension.ui['dashboard-tab'].backend['host-socket'],
                    },
                    menu,
                };
                return {
                    name: extension.name,
                    icon: extension.icon,
                    manifest,
                    folderName: extension.folderName,
                };
            });
            return result;
        })
            .catch((err) => {
            console.log(err);
        });
    }
    getStoreExtensions() {
        return (0, retry_1.retry)(() => {
            return this.client.get('/store');
        }, 10, // retries
        1000);
    }
    getStoreUnpublishedExtensions() {
        return (0, retry_1.retry)(() => {
            const response = this.client.get('/store/unpublished');
            console.log(response);
            return response;
        }, 10, // retries
        1000);
    }
    // eslint-disable-next-line class-methods-use-this
    getOS() {
        return new Promise((resolve) => {
            const platform = os_1.default.platform();
            const arch = os_1.default.arch();
            resolve({
                platform,
                arch,
            });
        });
    }
    removeAllExtensions() {
        return this.client.get('/extensions/removeAll');
    }
}
exports.desktopExtensionsBackend = new DesktopExtensionsBackend();
electron_1.ipcMain.handle('extensions-backend', async (_, methodName, ...args) => {
    log.info(`received: extensions-backend, methodName: ${methodName}, args: ${JSON.stringify(args)}`);
    try {
        const result = await exports.desktopExtensionsBackend[methodName](...args);
        return { result };
    }
    catch (error) {
        if (error.response) {
            return { error: error.response.data };
        }
        return { error: { Message: error.toString() } };
    }
});
electron_1.ipcMain.on('extensions-backend-install', (event, { name }) => {
    const [port] = event.ports;
    (0, sse_1.callSSE)(getExtensionsManagerSocket(), port, `/extensions/${encodeURIComponent(name)}/install`);
});
electron_1.ipcMain.on('extensions-backend-update', (event, { name }) => {
    const [port] = event.ports;
    (0, sse_1.callSSE)(getExtensionsManagerSocket(), port, `/extensions/${encodeURIComponent(name)}/update`);
});
electron_1.ipcMain.on('extensions-backend-uninstall', (event, { name }) => {
    const [port] = event.ports;
    (0, sse_1.callSSE)(getExtensionsManagerSocket(), port, `/extensions/${encodeURIComponent(name)}/uninstall`);
});
electron_1.ipcMain.on('extensions-backend-events', (event) => {
    const [port] = event.ports;
    (0, sse_1.callSSE)(getExtensionsManagerSocket(), port, `/events`);
});

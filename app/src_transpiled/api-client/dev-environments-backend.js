"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDevEnvsIpcHandlers = void 0;
const electron_1 = require("electron");
const minimist_1 = __importDefault(require("minimist"));
const backendSocket_1 = require("../service/backendSocket");
const socket_client_1 = require("./socket-client");
const sse_1 = require("../sse/sse");
const params = (0, minimist_1.default)(process.argv);
let devEnvBackendSocket = (0, backendSocket_1.getDevEnvsBackendSocketByPlatform)();
if (params['dev-envs-socket']) {
    devEnvBackendSocket = params['dev-envs-socket'];
}
class DevEnvsBackend {
    constructor() {
        this.selectDirectory = () => electron_1.dialog.showOpenDialog({ properties: ['openDirectory'] });
        this.renameContainer = (containerID, name) => this.client.post(`/devenvironments/${containerID}/rename`, {
            name,
        });
        this.client = new socket_client_1.SocketClient({ socketPath: devEnvBackendSocket });
    }
    getDevEnvironments() {
        return this.client.get('/devenvironments/list');
    }
    devEnvironmentsPreRequisites() {
        return this.client.get('/devenvironments/check');
    }
    // @ts-expect-error Not typed yet
    devEnvCreate({ url, path, image, openIDE = false }) {
        return this.client.post('/devenvironments/', {
            url,
            path,
            image,
            open_ide: openIDE,
        });
    }
    devEnvShare(name, repo) {
        return this.client.post(`/devenvironments/${name}/share`, {
            repo,
        });
    }
    // @ts-expect-error Not typed yet
    devEnvStart(devEnv) {
        return this.client.post(`/devenvironments/${devEnv.name}/start`);
    }
    // @ts-expect-error Not typed yet
    devEnvStop(devEnv) {
        return this.client.post(`/devenvironments/${devEnv.name}/stop`);
    }
    // @ts-expect-error Not typed yet
    devEnvRemove(devEnv) {
        return this.client.post(`/devenvironments/${devEnv.name}/remove`);
    }
    // @ts-expect-error Not typed yet
    devEnvStartService(devEnv, service) {
        return this.client.post(`/devenvironments/${devEnv.name}/service/${service}/start`);
    }
    // @ts-expect-error Not typed yet
    openEditor(devEnv, containerRef, editor) {
        return this.client.post(`/devenvironments/${devEnv.name}/ide/open`, {
            containerRef,
            editor,
        });
    }
    devEnvsCheckSSHAgent() {
        return this.client.get('/devenvironments/check/ssh');
    }
}
function registerDevEnvsIpcHandlers() {
    const backend = new DevEnvsBackend();
    electron_1.ipcMain.handle('dev-envs-backend', async (_, methodName, ...args) => {
        log.info(`received: dev-envs-backend, methodName: ${methodName}, args: ${JSON.stringify(args)}`);
        try {
            const result = await backend[methodName](...args);
            return { result };
        }
        catch (error) {
            if (error.response) {
                return { error: error.response.data };
            }
            return { error: { Message: error.toString() } };
        }
    });
    electron_1.ipcMain.on('dev-envs-events', (event) => {
        const [port] = event.ports;
        (0, sse_1.callSSE)(devEnvBackendSocket, port, `/devenvironments/events`);
    });
    electron_1.ipcMain.on('dev-envs-logs', (event, { name }) => {
        const [port] = event.ports;
        (0, sse_1.callSSE)(devEnvBackendSocket, port, `/devenvironments/${name}/logs`);
    });
    electron_1.ipcMain.on('dev-envs-create', (event, { url, path, image }) => {
        const [port] = event.ports;
        (0, sse_1.callSSE)(devEnvBackendSocket, port, `/devenvironments/create/${encodeURIComponent(url)}/${encodeURIComponent(path)}/${encodeURIComponent(image)}/`);
    });
}
exports.registerDevEnvsIpcHandlers = registerDevEnvsIpcHandlers;

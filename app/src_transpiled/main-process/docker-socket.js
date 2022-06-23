"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDockerStreamIpcHandlers = void 0;
const electron_1 = require("electron");
const axios_1 = __importDefault(require("axios"));
const backendSocket_1 = require("../service/backendSocket");
function registerDockerStreamIpcHandlers() {
    const client = axios_1.default.create({
        socketPath: (0, backendSocket_1.getDockerSocketByPlatform)(),
        headers: { 'user-agent': 'docker-desktop' },
        responseType: 'stream',
    });
    client.interceptors.request.use((request) => {
        log.info('Starting request on Docker socket', request.method?.toUpperCase(), request.url, request.data);
        return request;
    });
    client.interceptors.response.use((response) => {
        log.info(`Response success for ${response.request.method} ${response.request.path}`);
        return response;
    });
    const streamRefs = {};
    electron_1.ipcMain.on('init-docker-socket', (event, context, url) => {
        log.info(`received: init-docker-socket, context: ${context}, url: ${url}`);
        client
            .get(url)
            .then(async (response) => {
            const { statusCode } = response.data;
            if (statusCode !== 200) {
                return null;
            }
            const { data: stream } = response;
            streamRefs[context] = stream;
            stream.setEncoding('utf8');
            log.info(`Start listening to Docker socket : ${url}`);
            stream.on('data', async (chunk) => {
                event.reply(`${context}-value`, chunk);
            });
            stream.on('error', (error) => {
                log.info('error receiving chunk', error);
            });
            return stream;
        })
            .catch(() => null);
    });
    electron_1.ipcMain.handle('destroy-docker-stream', (_, context, engineState) => {
        log.info(`received: destroy-docker-stream, context: ${context}, engineState: ${engineState ?? 'unknown'}`);
        streamRefs[context]?.destroy();
        streamRefs[context] = null;
    });
    electron_1.ipcMain.on('open-stats-stream', (event, { container }) => {
        log.info(`received: open-stats-stream, for container: ${container.id}`);
        const [port] = event.ports;
        let streamRef = null;
        port.on('message', (e) => {
            if (e.data === 'close') {
                streamRef?.destroy();
            }
        });
        port.start();
        client
            .get(`/containers/${container.id}/stats`)
            .then(async (response) => {
            const { statusCode } = response.data;
            if (statusCode !== 200) {
                return null;
            }
            let { data: stream } = response;
            streamRef = stream;
            stream.setEncoding('utf8');
            stream.on('data', async (chunk) => {
                port.postMessage(chunk);
            });
            stream.on('error', (error) => {
                log.info('error receiving chunk', error);
                port.close();
                stream.destroy();
                stream = null;
            });
            return stream;
        })
            .catch(() => null);
    });
}
exports.registerDockerStreamIpcHandlers = registerDockerStreamIpcHandlers;

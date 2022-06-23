"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desktopBackend = exports.DesktopBackend = void 0;
const backendSocket_1 = require("../service/backendSocket");
const socket_client_1 = require("./socket-client");
const retry_1 = require("./retry");
// For historical reason, this C#/Swift api client is called DesktopBackend
class DesktopBackend {
    constructor() {
        this.client = new socket_client_1.SocketClient({
            socketPath: (0, backendSocket_1.getNativeBackendSocketByPlatform)(),
        });
    }
    deleteData(data) {
        return this.client.post('/desktop/cleanup', data);
    }
    getDockerState() {
        return this.client.get('/docker');
    }
    getSettings() {
        return this.client.get('/settings');
    }
    getWsl2Distros() {
        return this.client.get('/settings/wsl2-distros');
    }
    // @ts-expect-error Not typed yet
    updateSettings(data) {
        return this.client.post('/settings', data);
    }
    switchEngine(mode) {
        return this.client.post('/desktop/switch-engine', { mode });
    }
    notificationSubscribe(address) {
        return (0, retry_1.retry)(() => this.client.post('/notifications/subscriptions', { address }));
    }
    notificationUnsubscribe(address) {
        return this.client.delete('/notifications/subscriptions', { address });
    }
    installNewUpdate(mode) {
        return this.client.post('/update', { appcastURL: null, mode });
    }
    skipUpdate(build) {
        // Kitura API expects a build string, so we to convert build to string here
        return this.client.post('/update/skip', { build: `${build}` });
    }
    checkForUpdates() {
        return this.client.post('/update/check');
    }
    downloadUpdates() {
        return this.client.post('/update/download');
    }
    applyUpdates() {
        return this.client.post('/update/apply');
    }
    showNps() {
        return this.client.post('/nps');
    }
}
exports.DesktopBackend = DesktopBackend;
exports.desktopBackend = new DesktopBackend();

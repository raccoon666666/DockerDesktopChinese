"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desktopGoBackend = void 0;
const backendSocket_1 = require("../service/backendSocket");
const socket_client_1 = require("./socket-client");
const hub_1 = require("./hub");
const login_1 = require("../events/login");
function noPermission(message) {
    // We need to check the error message
    // But Axios doesn't handle proxy system very well
    return message.includes('401') || message.includes('403');
}
class DesktopGoBackend {
    constructor() {
        this.hubToken = '';
        this.client = new socket_client_1.SocketClient({
            socketPath: (0, backendSocket_1.getBackendSocketByPlatform)(),
        });
        login_1.loginEventSource.on((state) => {
            this.hubToken = state.type === 'LoginSuccess' ? state.accessToken : '';
        }, true);
    }
    getImages() {
        return this.client.get('/images');
    }
    // @ts-expect-error Method unused?
    pullImage(image) {
        // eslint-disable-next-line prefer-template
        return this.client.get('/images/' + image.id.replace('sha256:', ''), {
            repository: image.repository,
            name: image.name,
            tag: image.version,
        });
    }
    getVersions() {
        return this.client.get('/versions');
    }
    getFeatures() {
        return this.client.get('/features');
    }
    // @ts-expect-error Not typed yet
    setFeatures(body) {
        return this.client.post('/features', body);
    }
    track(event, body) {
        return this.client.post('/analytics/track', { event, body });
    }
    trackUsageCountEvent(usage) {
        return this.client.post('/usage', usage);
    }
    getSystemDiskUsage(path) {
        return this.client.get('/system/disk-usage', { path });
    }
    defaultEditor() {
        return this.client.get('/system/editor');
    }
    openEditor(path, wslDistro) {
        if (wslDistro === undefined) {
            return this.client.get(`/system/editor?path=${encodeURIComponent(path)}`);
        }
        return this.client.get(`/system/editor?path=${encodeURIComponent(path)}&wslDistro=${encodeURI(wslDistro)}`);
    }
    openBrowserForLogin() {
        return this.client.post('/registry/open-login');
    }
    dismissLoginError() {
        return this.client.post('/registry/state/reset');
    }
    // @ts-expect-error Not typed yet
    messageBoxButtonClicked(id, buttonClicked, optout) {
        return this.client.post(`/notify/messagebox/response`, {
            id,
            buttonClicked,
            optout,
        });
    }
    gatherDiagnostics() {
        return this.client.post('/diagnostics/gather');
    }
    getDiagnosticsStatus() {
        return this.client.get('/diagnostics/status');
    }
    cancelInProgressDiagnostics() {
        return this.client.post('/diagnostics/cancel');
    }
    uploadDiagnostics(id, path) {
        return this.client.post('/diagnostics/upload', { id, path });
    }
    hideTip() {
        return this.client.post('/tip/disable');
    }
    saveTipLastViewedTime(timestamp, id) {
        return this.client.post('/tip/last-viewed', { timestamp, id });
    }
    getPauseState() {
        return this.client.get('/backend/state');
    }
    pauseDocker() {
        return this.client.post('/pause');
    }
    resumeDocker() {
        return this.client.post('/unpause');
    }
    registryLogout() {
        return this.client.post('/registry/logout');
    }
    getRegistryToken() {
        return this.client
            .get('/registry/token')
            .then((p) => {
            log.info('Hub access token updated');
            this.hubToken = p.token;
        })
            .catch((error) => {
            log.error('cannot update Hub access token', error);
        });
    }
    retryWithNewToken(fn) {
        return fn().catch((error) => {
            if (noPermission(error.message)) {
                log.error('no permission -> request new access token', error);
                return this.getRegistryToken().then(() => fn());
            }
            throw error;
        });
    }
    getOrganizations() {
        return this.retryWithNewToken(() => (0, hub_1.getOrganizations)(this.hubToken));
    }
    getRemoteRepositories(organizationName, url, pageSize) {
        return this.retryWithNewToken(() => (0, hub_1.getRemoteRepositories)(organizationName, url, pageSize, this.hubToken));
    }
    getImageTags(organizationName, imageName) {
        return this.retryWithNewToken(() => (0, hub_1.getImageTags)(organizationName, imageName, this.hubToken));
    }
    getRepositoryEnablement(namespace, reponame) {
        return this.retryWithNewToken(() => (0, hub_1.getRepositoryEnablement)(namespace, reponame, this.hubToken));
    }
    getScanSummaryByTag(namespace, reponame, digest) {
        return this.retryWithNewToken(() => (0, hub_1.getScanSummaryByTag)(namespace, reponame, digest, this.hubToken));
    }
    restartVm() {
        return this.client.post('/engine/restart', { openContainerView: true });
    }
    // Mac only currently
    diskReset() {
        return this.client.delete('/vm/disk');
    }
    factoryReset() {
        return this.client.post('/app/reset');
    }
    // Mac only currently
    uninstallDesktop() {
        return this.client.post('/app/uninstall');
    }
    quitDesktop() {
        return this.client.post('/app/quit');
    }
    getKubernetes() {
        return this.client.get('/kubernetes');
    }
    resetKubernetes() {
        return this.client.post('/kubernetes/reset');
    }
    getDockerState() {
        return this.client.get('/docker');
    }
    showNps() {
        return this.client.post('/nps');
    }
    acceptLicenseTerms() {
        return this.client.post('/license/accept');
    }
    rejectLicenseTerms() {
        return this.client.post('/license/reject');
    }
}
exports.desktopGoBackend = new DesktopGoBackend();

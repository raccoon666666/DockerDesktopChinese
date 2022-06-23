"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDevEnvsBackendSocketByPlatform = exports.getVolumeBackendSocketByPlatform = exports.getNativeBackendSocketByPlatform = exports.getBackendSocketByPlatform = exports.getDockerSocketByPlatform = void 0;
const os_1 = __importDefault(require("os"));
function getDockerSocketByPlatform() {
    switch (os_1.default.platform()) {
        case 'darwin':
            return '/var/run/docker.sock';
        case 'win32':
            return '\\\\.\\pipe\\dockerDesktopEngine';
        default:
            return `${os_1.default.homedir()}/.docker/desktop/docker.sock`;
    }
}
exports.getDockerSocketByPlatform = getDockerSocketByPlatform;
function getBackendSocketByPlatform() {
    switch (os_1.default.platform()) {
        case 'darwin':
            return 'backend.sock';
        case 'win32':
            return '\\\\.\\pipe\\dockerBackendApiServer';
        default:
            return `${os_1.default.homedir()}/.docker/desktop/backend.sock`;
    }
}
exports.getBackendSocketByPlatform = getBackendSocketByPlatform;
function getNativeBackendSocketByPlatform() {
    switch (os_1.default.platform()) {
        case 'darwin':
            return 'backend.native.sock';
        case 'win32':
            return '\\\\.\\pipe\\dockerBackendNativeApiServer';
        default:
            return `${os_1.default.homedir()}/.docker/desktop/backend.native.sock`;
    }
}
exports.getNativeBackendSocketByPlatform = getNativeBackendSocketByPlatform;
function getVolumeBackendSocketByPlatform() {
    switch (os_1.default.platform()) {
        case 'darwin':
            return 'volume-contents.sock';
        case 'win32':
            return '\\\\.\\pipe\\dockerVolumeContents';
        default:
            return `${os_1.default.homedir()}/.docker/desktop/volume-contents.sock`;
    }
}
exports.getVolumeBackendSocketByPlatform = getVolumeBackendSocketByPlatform;
function getDevEnvsBackendSocketByPlatform() {
    switch (os_1.default.platform()) {
        case 'darwin':
            return 'docker-dev-env-api.sock';
        case 'win32':
            return '\\\\.\\pipe\\dockerDevEnvApiServer';
        default:
            return `${os_1.default.homedir()}/.docker/desktop/docker-dev-env-api.sock`;
    }
}
exports.getDevEnvsBackendSocketByPlatform = getDevEnvsBackendSocketByPlatform;

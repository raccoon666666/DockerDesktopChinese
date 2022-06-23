"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.volumeContentsBackend = void 0;
const fs_1 = __importDefault(require("fs"));
const backendSocket_1 = require("../service/backendSocket");
const socket_client_1 = require("./socket-client");
class VolumeContentsBackend {
    constructor() {
        this.client = new socket_client_1.SocketClient({
            socketPath: (0, backendSocket_1.getVolumeBackendSocketByPlatform)(),
        });
    }
    getContents(volume, directory) {
        return this.client.get('/volume-contents', {
            volume,
            directory,
        });
    }
    deleteContents(volume, name) {
        return this.client.delete('/volume-contents', {
            volume,
            name,
        });
    }
    getVolumes() {
        return this.client.get('/volumes');
    }
    saveContent(volume, name, filePath) {
        this.client
            .getBuffer('/save-content', {
            volume,
            name,
        })
            .then((data) => data.pipe(fs_1.default.createWriteStream(filePath)));
    }
}
exports.volumeContentsBackend = new VolumeContentsBackend();

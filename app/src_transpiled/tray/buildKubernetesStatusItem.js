"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildKubernetesStatusItem = void 0;
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
function buildKubernetesStatusItem(kubernetes, isPaused = false) {
    const { state, enabled } = kubernetes;
    if (!enabled || state === 'stopped') {
        return null;
    }
    let icon = 'waiting';
    switch (state) {
        case 'starting':
            icon = 'pending.png';
            break;
        case 'running':
            icon = 'running.png';
            break;
        case 'stopping':
            icon = 'pending.png';
            break;
        default:
            icon = 'waiting.png';
            break;
    }
    if (isPaused) {
        icon = 'Paused.png';
    }
    return {
        enabled: false,
        icon: electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'assets', icon)),
        label: `Kubernetes is ${state || 'waiting'}`,
    };
}
exports.buildKubernetesStatusItem = buildKubernetesStatusItem;

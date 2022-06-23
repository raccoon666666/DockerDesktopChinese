"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildEngineStatusItem = void 0;
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
function buildEngineStatusItem(engineState, isPaused = false, isBlocked = false) {
    let icon = 'waiting';
    let label = `Docker Desktop is ${engineState || 'waiting'}`;
    switch (engineState) {
        case 'stopped':
            icon = 'stopped.png';
            break;
        case 'starting':
            icon = 'pending.png';
            break;
        case 'running':
            icon = 'running.png';
            break;
        case 'updating':
            icon = 'pending.png';
            break;
        case 'paused':
            icon = 'Paused.png';
            break;
        default:
            icon = 'waiting.png';
            break;
    }
    if (isPaused) {
        icon = 'Paused.png';
        label = 'Docker Desktop is paused';
    }
    if (isBlocked && engineState !== 'starting' && engineState !== 'stopped') {
        // Avoid the blocked status when stopped/starting as these are more important.
        icon = 'Paused.png';
        label = 'Docker Desktop is blocked';
    }
    return {
        enabled: false,
        icon: electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'assets', icon)),
        label,
    };
}
exports.buildEngineStatusItem = buildEngineStatusItem;

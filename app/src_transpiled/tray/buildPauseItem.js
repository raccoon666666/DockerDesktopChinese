"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPauseItem = void 0;
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const desktop_go_backend_1 = require("../api-client/desktop-go-backend");
function buildPauseItem(pauseState) {
    if (pauseState.isPaused) {
        return {
            icon: electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'assets', `icon_resume_${electron_1.nativeTheme.shouldUseDarkColors ? 'dark' : 'light'}.png`)),
            label: 'Resume',
            async click() {
                desktop_go_backend_1.desktopGoBackend.track('actionResume');
                desktop_go_backend_1.desktopGoBackend.resumeDocker();
            },
        };
    }
    return {
        icon: electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'assets', `icon_pause_${electron_1.nativeTheme.shouldUseDarkColors ? 'dark' : 'light'}.png`)),
        label: 'Pause',
        async click() {
            desktop_go_backend_1.desktopGoBackend.track('actionPause');
            desktop_go_backend_1.desktopGoBackend.pauseDocker();
        },
    };
}
exports.buildPauseItem = buildPauseItem;

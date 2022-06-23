"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildQuitItem = void 0;
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const desktop_go_backend_1 = require("../api-client/desktop-go-backend");
function buildQuitItem() {
    return {
        icon: electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'assets', `icon_quit_${electron_1.nativeTheme.shouldUseDarkColors ? 'dark' : 'light'}.png`)),
        label: 'Quit Docker Desktop',
        accelerator: __DARWIN__ ? 'CmdOrCtrl+Q' : undefined,
        async click() {
            desktop_go_backend_1.desktopGoBackend.track('actionMenuQuit');
            desktop_go_backend_1.desktopGoBackend.quitDesktop();
        },
    };
}
exports.buildQuitItem = buildQuitItem;

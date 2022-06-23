"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildUpdateIcon = void 0;
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
function buildUpdateIcon() {
    return electron_1.nativeImage
        .createFromPath(path_1.default.join(__dirname, 'assets', `icon_notif_${electron_1.nativeTheme.shouldUseDarkColors ? 'dark' : 'light'}.png`))
        .resize({
        width: 12,
        height: 12,
    });
}
exports.buildUpdateIcon = buildUpdateIcon;

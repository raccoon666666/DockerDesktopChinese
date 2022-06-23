"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlockedTrayIcon = exports.getSyncTrayIcon = exports.getUpdateTrayIcon = exports.getTrayIcon = void 0;
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
let trayIcons = null;
let updateTrayIcon = null;
let syncTrayIcons = null;
let blockedTrayIcon = null;
if (__WIN32__) {
    trayIcons = {
        dark: [...Array(6).keys()].map((frame) => electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'assets', 'windows', `systray-icon-win-light-frame${frame}.ico`))),
        light: [...Array(6).keys()].map((frame) => electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'assets', 'windows', `systray-icon-inverted-frame${frame}.ico`))),
    };
    updateTrayIcon = {
        dark: electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'assets', 'windows', 'systray-icon-update-light.ico')),
        light: electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'assets', 'windows', 'systray-icon-update-dark.ico')),
    };
    syncTrayIcons = {
        dark: [...Array(6).keys()].map((frame) => electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'assets', 'windows', `win_statusItemSyncIcon_black_${frame}.ico`))),
        light: [...Array(6).keys()].map((frame) => electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'assets', 'windows', `win_statusItemSyncIcon_inverted_${frame}.ico`))),
    };
    blockedTrayIcon = {
        dark: electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'assets', 'windows', 'systray-icon-blocked-light.ico')),
        light: electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'assets', 'windows', 'systray-icon-blocked-dark.ico')),
    };
}
else if (__DARWIN__) {
    trayIcons = [...Array(6).keys()].map((frame) => electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'assets', 'darwin', `statusItemIcon-${frame}Template.png`)));
    updateTrayIcon = electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'assets', 'darwin', 'statusItemUpdateIcon-Template.png'));
    syncTrayIcons = [...Array(6).keys()].map((frame) => electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'assets', 'darwin', `whale_spin_${frame}Template.png`)));
    blockedTrayIcon = electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'assets', 'darwin', 'statusItemBlockedIcon-Template.png'));
}
else {
    trayIcons = [...Array(6).keys()].map((frame) => electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'assets', 'linux', `systray-icon-inverted-frame-${frame}Template.png`)));
    updateTrayIcon = electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'assets', 'linux', 'systray-icon-update-dark.png'));
    syncTrayIcons = [...Array(6).keys()].map((frame) => electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'assets', 'linux', `statusItemSyncIcon_inverted_${frame}Template.png`)));
    blockedTrayIcon = electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'assets', 'linux', 'systray-icon-blocked-dark.png'));
}
function getTrayIcon(lastTheme = null, frame = 0) {
    if (__WIN32__) {
        return trayIcons[lastTheme?.SystemUsesLightTheme?.value ? 'dark' : 'light'][frame];
    }
    return trayIcons[frame];
}
exports.getTrayIcon = getTrayIcon;
function getUpdateTrayIcon(lastTheme = null) {
    if (__WIN32__) {
        return updateTrayIcon[lastTheme?.SystemUsesLightTheme?.value ? 'dark' : 'light'];
    }
    return updateTrayIcon;
}
exports.getUpdateTrayIcon = getUpdateTrayIcon;
function getSyncTrayIcon(lastTheme = null, frame = 0) {
    if (__WIN32__) {
        return syncTrayIcons[lastTheme?.SystemUsesLightTheme?.value ? 'dark' : 'light'][frame];
    }
    return syncTrayIcons[frame];
}
exports.getSyncTrayIcon = getSyncTrayIcon;
function getBlockedTrayIcon(lastTheme = null) {
    if (__WIN32__) {
        return blockedTrayIcon[lastTheme?.SystemUsesLightTheme?.value ? 'dark' : 'light'];
    }
    return blockedTrayIcon;
}
exports.getBlockedTrayIcon = getBlockedTrayIcon;

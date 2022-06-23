"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showWindow = void 0;
const electron_1 = require("electron");
const forcefocus_1 = __importDefault(require("forcefocus"));
const showWindow = (win) => {
    electron_1.app.focus({ steal: true });
    if (win.isMinimized()) {
        win.restore();
    }
    else if (__WIN32__) {
        forcefocus_1.default.focusWindow(win);
    }
    else {
        win.focus();
    }
};
exports.showWindow = showWindow;

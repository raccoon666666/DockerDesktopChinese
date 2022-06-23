"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackWindowState = exports.restoreMaximized = exports.restoreWindowState = void 0;
const electron_1 = require("electron");
const electron_store_1 = __importDefault(require("electron-store"));
const debounce_1 = __importDefault(require("lodash/debounce"));
const isBoolean_1 = __importDefault(require("lodash/isBoolean"));
const store = new electron_store_1.default({ name: 'window-management' });
function isValidBound(bound) {
    return (Number.isInteger(bound.x) &&
        Number.isInteger(bound.y) &&
        Number.isInteger(bound.width) &&
        Number.isInteger(bound.height) &&
        !!bound.width &&
        bound.width > 0 &&
        !!bound.height &&
        bound.height > 0);
}
function isVisibleOnDisplay(windowBounds, displayBounds) {
    return (windowBounds.x >= displayBounds.x &&
        windowBounds.y >= displayBounds.y &&
        windowBounds.x + windowBounds.width <=
            displayBounds.x + displayBounds.width &&
        windowBounds.y + windowBounds.height <=
            displayBounds.y + displayBounds.height);
}
function isWindowVisibleOnSomeDisplay(windowBounds) {
    return electron_1.screen
        .getAllDisplays()
        .some((display) => isVisibleOnDisplay(windowBounds, display.bounds));
}
function createState(defaultWidth, defaultHeight) {
    return {
        // We omit x and y so the window automatically gets positioned in the center by default
        windowBounds: { width: defaultWidth, height: defaultHeight },
        displayBounds: electron_1.screen.getPrimaryDisplay().bounds,
        isFullScreen: false,
        isMaximized: false,
    };
}
function isValidState(state) {
    return (!!state.displayBounds &&
        !!state.windowBounds &&
        isValidBound(state.windowBounds) &&
        isValidBound(state.displayBounds) &&
        (0, isBoolean_1.default)(state.isFullScreen) &&
        (0, isBoolean_1.default)(state.isMaximized));
}
function restoreWindowState(name, defaultWidth, defaultHeight) {
    const storageKey = `window-state-${name}`;
    let state = store.get(storageKey);
    if (!state ||
        !isValidState(state) ||
        !isWindowVisibleOnSomeDisplay(state.windowBounds)) {
        state = createState(defaultWidth, defaultHeight);
    }
    return {
        state: state,
        storageKey,
    };
}
exports.restoreWindowState = restoreWindowState;
function restoreMaximized(window, state) {
    if (state.state.isFullScreen) {
        window.setFullScreen(true);
    }
    else if (state.state.isMaximized) {
        window.maximize();
    }
}
exports.restoreMaximized = restoreMaximized;
function trackWindowState(window, defaultState) {
    const { storageKey, state } = defaultState;
    const throttledUpdateState = (0, debounce_1.default)(updateState, 800, {
        leading: true,
        trailing: true,
    });
    window.on('close', updateState);
    window.on('closed', closedHandler);
    window.on('move', throttledUpdateState);
    window.on('resize', throttledUpdateState);
    function closedHandler() {
        throttledUpdateState.cancel();
        window.removeListener('close', updateState);
        window.removeListener('closed', closedHandler);
        window.removeListener('move', throttledUpdateState);
        window.removeListener('resize', throttledUpdateState);
    }
    function updateState() {
        const winBounds = window.getBounds();
        if (!window.isMaximized() &&
            !window.isFullScreen() &&
            !window.isMinimized()) {
            state.windowBounds = winBounds;
        }
        state.isMaximized = window.isMaximized();
        state.isFullScreen = window.isFullScreen();
        state.displayBounds = electron_1.screen.getDisplayMatching(winBounds).bounds;
        try {
            // As of https://github.com/sindresorhus/conf/blob/main/source/index.ts#L451 this may throw
            store.set(storageKey, state);
        }
        catch (e) {
            log.error(`Failed to store window state on disk (${storageKey}).`);
        }
    }
}
exports.trackWindowState = trackWindowState;

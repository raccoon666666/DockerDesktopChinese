"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWindow = exports.DEFAULT_WIDTH = exports.DEFAULT_HEIGHT = void 0;
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const vm_stats_1 = require("../events/vm-stats");
exports.DEFAULT_HEIGHT = 720;
exports.DEFAULT_WIDTH = 1270;
/**
 * Ensure that we keep all child processes' id to kill all of them before quitting any window
 */
const childPids = [];
electron_1.ipcMain.on('child-pid', (event) => {
    const pid = event;
    childPids.push(pid);
});
function buildIconPathByPlatform() {
    const genericPath = (iconName) => {
        return electron_1.app.isPackaged
            ? path_1.default.join(process.resourcesPath, 'assets', iconName)
            : path_1.default.join(__dirname, 'assets', iconName);
    };
    if (__DARWIN__) {
        return genericPath('icon.icns');
    }
    if (__WIN32__) {
        return genericPath('icon.ico');
    }
    return genericPath('icon.original.png');
}
function createWindow(options) {
    const isE2ETest = process.env.EXTENSION_E2E === 'true';
    const appWebprefs = {
        nodeIntegration: true,
        contextIsolation: false,
        spellcheck: false,
        webviewTag: true,
    };
    const webprefs = isE2ETest
        ? {
            ...appWebprefs,
            webSecurity: false,
            nodeIntegrationInSubFrames: true,
            preload: require.resolve('@docker/extension-preload'),
        }
        : appWebprefs;
    const win = new electron_1.BrowserWindow({
        webPreferences: webprefs,
        titleBarStyle: 'hidden',
        resizable: true,
        show: false,
        width: exports.DEFAULT_WIDTH,
        height: exports.DEFAULT_HEIGHT,
        icon: electron_1.nativeImage.createFromPath(buildIconPathByPlatform()),
        frame: __DARWIN__,
        ...options,
    });
    win.setMenuBarVisibility(__DARWIN__);
    // Restart listening to the VM stats.
    vm_stats_1.vmStatsEventSource.start({ disabledLogs: true });
    win.on('close', () => {
        // for tracking tutorial
        win.webContents.send('close-window');
        // Close the VM stats stream.
        vm_stats_1.vmStatsEventSource.close();
        log.info('before closing windows, childPids to kill: ', childPids);
        childPids.forEach((pid) => {
            try {
                process.kill(pid);
                // eslint-disable-next-line no-empty
            }
            catch (error) { }
        });
    });
    // Showing window after it is fully loaded
    win.once('ready-to-show', () => {
        win.show();
    });
    return win;
}
exports.createWindow = createWindow;

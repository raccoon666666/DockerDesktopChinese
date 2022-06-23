"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectFocusAfterLoginHandler = exports.showView = void 0;
const electron_1 = require("electron");
const routes_1 = require("./routes");
const url_1 = require("./url");
const createWindow_1 = require("./createWindow");
const findExistingMainWindow_1 = require("../tray/findExistingMainWindow");
const windowStateRestorer_1 = require("./windowStateRestorer");
const showWindow_1 = require("./showWindow");
const login_1 = require("../events/login");
const update_1 = require("../events/update");
const license_1 = require("../events/license");
const vm_stats_1 = require("../events/vm-stats");
async function openIcon() {
    if (__DARWIN__) {
        // Show dock icon whenever a BrowserWindow is running
        await electron_1.app.dock.show();
    }
}
async function showView(opts) {
    log.info(`open with opts: ${JSON.stringify(opts)}`);
    const name = opts.name ?? 'dashboard';
    const route = (0, routes_1.getRoute)(opts);
    let win;
    if ((0, findExistingMainWindow_1.isMainWindow)(name)) {
        win = (0, findExistingMainWindow_1.findExistingMainWindow)();
        if (!win) {
            await electron_1.app.whenReady();
            const restoredWindowState = (0, windowStateRestorer_1.restoreWindowState)('dashboard', createWindow_1.DEFAULT_WIDTH, createWindow_1.DEFAULT_HEIGHT);
            const newWindow = (0, createWindow_1.createWindow)({
                ...route.options,
                ...restoredWindowState.state.windowBounds,
            });
            const disposables = [];
            newWindow.on('closed', () => {
                disposables.forEach((item) => item.dispose());
            });
            await newWindow.loadURL((0, url_1.createURL)(route, opts));
            disposables.push(login_1.loginEventSource.on((login) => {
                if (newWindow) {
                    newWindow.webContents.send('login-update', login);
                }
            }, true));
            disposables.push(update_1.updateEventSource.on((update) => {
                if (newWindow) {
                    newWindow.webContents.send('notification', {
                        type: 'update/success',
                        payload: update,
                    });
                }
            }, true));
            disposables.push(license_1.licenseEventSource.on((license) => {
                if (newWindow) {
                    newWindow.webContents.send('notification', {
                        type: 'license.success',
                        payload: license,
                    });
                }
            }, true));
            disposables.push(vm_stats_1.vmStatsEventSource.on((vmStats) => {
                if (newWindow) {
                    newWindow.webContents.send('vm-stats', {
                        type: 'vm-stats.success',
                        payload: vmStats,
                    });
                }
            }, true));
            (0, windowStateRestorer_1.restoreMaximized)(newWindow, restoredWindowState);
            (0, windowStateRestorer_1.trackWindowState)(newWindow, restoredWindowState);
            await openIcon();
            return;
        }
        const p = new Promise((resolve) => {
            electron_1.ipcMain.once('show-view', () => {
                if (win) {
                    (0, showWindow_1.showWindow)(win);
                }
                resolve();
            });
            win?.webContents.send('load-view', (0, url_1.getCompleteHash)(route, opts.path));
        });
        await p;
        await openIcon();
        return;
    }
    win = electron_1.BrowserWindow.getAllWindows().find((window) => window.webContents.getURL().includes(name));
    if (!win) {
        const newWindow = (0, createWindow_1.createWindow)(route.options);
        await newWindow.loadURL((0, url_1.createURL)(route, opts));
    }
    else {
        (0, showWindow_1.showWindow)(win);
    }
    await openIcon();
}
exports.showView = showView;
function connectFocusAfterLoginHandler() {
    login_1.loginEventSource.on((login) => {
        if (login.type === 'CodeReceived' ||
            login.type === 'CredstoreRequiresInitialisation') {
            const win = (0, findExistingMainWindow_1.findExistingMainWindow)();
            if (win) {
                (0, showWindow_1.showWindow)(win);
            }
            else {
                showView({ name: 'dashboard' });
            }
        }
        else if (login.type === 'LoginFailure' ||
            login.type === 'LoginRejected') {
            const win = (0, findExistingMainWindow_1.findExistingMainWindow)();
            if (win) {
                (0, showWindow_1.showWindow)(win);
            }
        }
    }, false);
}
exports.connectFocusAfterLoginHandler = connectFocusAfterLoginHandler;

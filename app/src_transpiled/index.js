"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimist_1 = __importDefault(require("minimist"));
const electron_1 = require("electron");
const child_process_1 = require("child_process");
require("./globals");
require("./logger");
require("./unhandled");
require("./service/theme");
const window_manager_1 = require("./window-manager");
const tray_1 = require("./tray");
const setupDebugTools_1 = require("./setupDebugTools");
const main_process_1 = require("./main-process");
const registerToastHandlers_1 = require("./extensions/registerToastHandlers");
const registerNavigateToRouteHandler_1 = require("./extensions/registerNavigateToRouteHandler");
const registerDashboardPageIpcHandlers_1 = require("./extensions/registerDashboardPageIpcHandlers");
const applicationMenu_1 = require("./window-manager/applicationMenu");
const engine_1 = require("./events/engine");
const pause_1 = require("./events/pause");
const kubernetes_1 = require("./events/kubernetes");
const events_1 = require("./events");
const showWindow_1 = require("./window-manager/showWindow");
// When openUIOnStartupDisabled: true (not showing Dashboard at startup), we shouldn't show any Docker Dock icon
// More info https://github.com/docker/for-mac/issues/6167
if (electron_1.app.isPackaged && __DARWIN__ && electron_1.app.dock && electron_1.app.dock.hide) {
    electron_1.app.dock.hide();
}
// @ts-expect-error
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
const params = (0, minimist_1.default)(process.argv);
log.info('params received: ', params);
const pinnedIconClicked = params.name === undefined && electron_1.app.isPackaged;
const isE2ETest = process.env.NODE_ENV === 'test';
const isProd = electron_1.app.isPackaged;
const isFocusShortcutEnabled = isE2ETest || !isProd;
let onlyAllowSingleInstance = false;
if (isProd && !isE2ETest) {
    // app.requestSingleInstanceLock() blocks local dev startup on Mac
    const gotTheLock = electron_1.app.requestSingleInstanceLock();
    onlyAllowSingleInstance = !gotTheLock;
}
if (electron_1.app.hasSingleInstanceLock()) {
    (0, applicationMenu_1.createApplicationMenu)();
}
// We shouldn't allow multiple instances of the app in real production mode
// For local development and e2e tests, we bypass this restriction because one NamedPipe cannot be listened by multiple server at this time
// When we finish removing the notification server, we can remove this sophisticated logic in `second-instance`
if (onlyAllowSingleInstance) {
    if (electron_1.app.dock && electron_1.app.dock.hide) {
        electron_1.app.dock.hide();
    }
    log.info('failed to obtain the lock, quitting application');
    electron_1.app.quit();
}
else {
    // We should have only one Dashboard/Settings/Troubleshoot... window at a time, so we maintain only one Node server at a time, to listen on the socket file
    // and receive notification from the server
    // About box doesn't need to listen of socket to have notification from the server
    // Ideally we should have this notification Node server running separately from the any Electron process
    if (!pinnedIconClicked && params.name !== 'about') {
        // When we start/open Docker Desktop from the Dock, the params.name is undefined
        (0, engine_1.registerEngineEvents)();
        (0, pause_1.registerPauseEvents)();
        (0, kubernetes_1.registerKubernetesEvents)();
        (0, events_1.startSSEClients)();
    }
    electron_1.app.on('second-instance', async (_, argv) => {
        const args = (0, minimist_1.default)(argv);
        (0, window_manager_1.showView)(args);
    });
}
// Open dashboard when user clicked on the Dock Icon (DD must be running, otherwise it will be started)
electron_1.app.on('activate', (_, hasVisibleWindows) => {
    if (hasVisibleWindows) {
        electron_1.BrowserWindow.getAllWindows().forEach(showWindow_1.showWindow);
    }
    else {
        (0, window_manager_1.showView)({ name: 'dashboard' });
    }
});
electron_1.app.on('quit', (_, exitCode) => {
    log.info(`application is about to quit ${exitCode}, stopping notification server`);
});
electron_1.app.on('render-process-gone', (_event, _, details) => {
    log.info(`renderer process has gone unexpectedly: ${JSON.stringify(details)}`);
});
electron_1.app.on('child-process-gone', (_, details) => {
    log.info(`child process has gone unexpectedly: ${JSON.stringify(details)}`);
});
(0, main_process_1.registerIPCMainHandlers)();
(0, registerToastHandlers_1.registerToastHandlers)();
(0, registerNavigateToRouteHandler_1.registerNavigateToRouteHandlers)();
(0, registerDashboardPageIpcHandlers_1.registerDashboardPageIpcHandlers)();
// This function is to be refactored after the feature flag on new Whale menu is enabled.
// In case the feature flag is enabled:
// - app.on('ready', () => {...}) only means that we trigger new Whale menu initialization
// - if (app.isReady()) {...} means that we open different route than "tray"
// In case the feature flag is disabled:
// - we never have params.name === 'tray', and openUI will open the expected route (different than "tray")
function openUI() {
    if (pinnedIconClicked && electron_1.app.isPackaged) {
        if (__LINUX__) {
            return;
        }
        if (__WIN32__) {
            log.info('open Windows binary');
            (0, child_process_1.spawn)('C:\\Program Files\\Docker\\Docker\\Docker Desktop.exe', {
                detached: true,
            });
        }
        else {
            log.info('open Mac binary');
            (0, child_process_1.spawn)('/usr/bin/open', ['/Applications/Docker.app'], {
                detached: true,
                stdio: 'ignore',
            });
        }
        process.exit(0);
    }
    else {
        (0, setupDebugTools_1.setupDebugTools)();
        if (params.name === 'tray') {
            (0, tray_1.initTray)();
            return;
        }
        if (!electron_1.app.isPackaged || params.name) {
            (0, tray_1.initTray)();
        }
        if (!electron_1.app.isPackaged || process.env.NODE_ENV === 'test' || params.name) {
            (0, window_manager_1.showView)(params);
        }
    }
}
if (electron_1.app.isReady()) {
    log.info('application has already finished initializing, tray icon is already there');
    openUI();
    (0, window_manager_1.connectFocusAfterLoginHandler)();
}
electron_1.app.on('ready', () => {
    log.info('application has just finished initializing');
    openUI();
    (0, window_manager_1.connectFocusAfterLoginHandler)();
    if (isFocusShortcutEnabled) {
        electron_1.globalShortcut.register('Control+Shift+D', () => {
            electron_1.BrowserWindow.getAllWindows().forEach(showWindow_1.showWindow);
        });
    }
});

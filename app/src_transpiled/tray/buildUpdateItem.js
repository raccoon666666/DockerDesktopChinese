"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildUpdateItem = void 0;
const electron_1 = require("electron");
const desktop_backend_1 = require("../api-client/desktop-backend");
const window_manager_1 = require("../window-manager");
const buildUpdateIcon_1 = require("./buildUpdateIcon");
function buildUpdateItem(updateStatus) {
    const updateIcon = (0, buildUpdateIcon_1.buildUpdateIcon)();
    switch (updateStatus) {
        case 'upToDate':
            return {
                label: `Check for Updates${__DARWIN__ ? '...' : ''}`,
                async click() {
                    await (0, window_manager_1.showView)({ name: 'settings/update' });
                    desktop_backend_1.desktopBackend.checkForUpdates();
                },
            };
        case 'waitingForDownload':
            return {
                icon: updateIcon,
                label: 'Download update...',
                async click() {
                    if (__LINUX__) {
                        electron_1.shell.openExternal('https://docs.docker.com/desktop/linux/release-notes/');
                        return;
                    }
                    await (0, window_manager_1.showView)({ name: 'settings/update' });
                    desktop_backend_1.desktopBackend.downloadUpdates();
                },
            };
        case 'startingDownload':
            return {
                icon: updateIcon,
                enabled: false,
                label: 'Download will start soon...',
            };
        case 'downloading':
            return {
                icon: updateIcon,
                enabled: false,
                label: `Downloading update${__DARWIN__ ? '...' : ''}`,
            };
        default:
            return null;
    }
}
exports.buildUpdateItem = buildUpdateItem;

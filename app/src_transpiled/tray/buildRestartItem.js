"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRestartItem = exports.restartDocker = void 0;
const electron_1 = require("electron");
const electron_store_1 = __importDefault(require("electron-store"));
const path_1 = __importDefault(require("path"));
const desktop_backend_1 = require("../api-client/desktop-backend");
const desktop_go_backend_1 = require("../api-client/desktop-go-backend");
const buildUpdateIcon_1 = require("./buildUpdateIcon");
const store = new electron_store_1.default({ name: 'window-management' });
async function restartDocker() {
    let displayRestartDialog = true;
    // json file could be malformed
    try {
        displayRestartDialog = store.get('displayRestartDialog', true);
    }
    catch (error) {
        log.error('Failed to get displayRestartDialog option', error);
    }
    if (displayRestartDialog) {
        const dialogResult = await electron_1.dialog.showMessageBox({
            title: '重启Docker Desktop',
            type: 'warning',
            buttons: ['Restart', '取消'],
            message: 'Restart Docker Desktop',
            detail: 'You are about to restart Docker Desktop. A restart stops all running containers. No data will be lost otherwise.\n\nDo you want to continue?',
            checkboxLabel: `Don't show this message again`,
            checkboxChecked: !displayRestartDialog,
            noLink: true,
        });
        const { response, checkboxChecked } = dialogResult;
        if (response === 0) {
            desktop_go_backend_1.desktopGoBackend.restartVm();
            try {
                store.set('displayRestartDialog', !checkboxChecked);
            }
            catch (error) {
                log.error('Failed to store displayRestartDialog option', error);
            }
        }
    }
    else {
        desktop_go_backend_1.desktopGoBackend.restartVm();
    }
}
exports.restartDocker = restartDocker;
function buildRestartItem(updateStatus) {
    if (updateStatus === 'readyToInstall') {
        return {
            icon: (0, buildUpdateIcon_1.buildUpdateIcon)(),
            label: 'Update and restart',
            async click() {
                desktop_backend_1.desktopBackend.applyUpdates();
            },
        };
    }
    return {
        icon: electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'assets', `icon_restart_${electron_1.nativeTheme.shouldUseDarkColors ? 'dark' : 'light'}.png`)),
        label: 'Restart',
        accelerator: __DARWIN__ ? 'CmdOrCtrl+R' : undefined,
        async click() {
            desktop_go_backend_1.desktopGoBackend.track('actionMenuRestart');
            restartDocker();
        },
    };
}
exports.buildRestartItem = buildRestartItem;

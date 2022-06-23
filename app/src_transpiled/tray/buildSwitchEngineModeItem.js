"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSwitchEngineModeItem = void 0;
const electron_1 = require("electron");
const electron_store_1 = __importDefault(require("electron-store"));
const desktop_backend_1 = require("../api-client/desktop-backend");
const desktop_go_backend_1 = require("../api-client/desktop-go-backend");
const store = new electron_store_1.default({ name: 'window-management' });
function buildSwitchEngineModeItem(engineMode) {
    if (!__WIN32__)
        return null;
    const targetMode = engineMode === 'linux' ? 'Windows' : 'Linux';
    return {
        label: `Switch to ${targetMode} containers...`,
        async click() {
            desktop_go_backend_1.desktopGoBackend.track(`actionMenuSwitch${targetMode}Daemon`);
            let displaySwitchWinLinContainers = true;
            // json file could be malformed
            try {
                displaySwitchWinLinContainers = store.get('displaySwitchWinLinContainers', true);
            }
            catch (error) {
                log.error('Failed to get displaySwitchWinLinContainers option', error);
            }
            if (displaySwitchWinLinContainers) {
                const dialogResult = await electron_1.dialog.showMessageBox({
                    title: `Switch to ${targetMode} containers`,
                    type: 'warning',
                    buttons: ['Switch', '取消'],
                    message: `Switch to ${targetMode} containers`,
                    detail: `You are about to switch to ${targetMode} containers. Existing containers will continue to run, but you will not be able to manage them until you switch back to ${engineMode} containers. No data will be lost otherwise.\nDo you want to continue?`,
                    checkboxLabel: `Don't show this message again`,
                    checkboxChecked: !displaySwitchWinLinContainers,
                    noLink: true,
                });
                const { response, checkboxChecked } = dialogResult;
                if (response === 0) {
                    desktop_backend_1.desktopBackend.switchEngine(targetMode);
                    try {
                        store.set('displaySwitchWinLinContainers', !checkboxChecked);
                    }
                    catch (error) {
                        log.error('Failed to store displaySwitchWinLinContainers option', error);
                    }
                }
            }
            else {
                desktop_backend_1.desktopBackend.switchEngine(targetMode);
            }
        },
    };
}
exports.buildSwitchEngineModeItem = buildSwitchEngineModeItem;

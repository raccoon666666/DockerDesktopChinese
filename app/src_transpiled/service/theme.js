"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThemeRegistry = void 0;
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
// @ts-expect-error Not typed yet
const regedit_1 = __importDefault(require("regedit"));
// Fix regedit tool path in production
if (electron_1.app.isPackaged) {
    try {
        regedit_1.default.setExternalVBSLocation(path_1.default.join(path_1.default.dirname(electron_1.app.getPath('exe')), 'resources/regedit/vbs'));
    }
    catch (error) {
        log.error('Error set theme resource location:', error);
    }
}
const THEME_KEY = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize';
function getThemeRegistry() {
    return new Promise((resolve) => {
        if (__WIN32__) {
            try {
                regedit_1.default.list(THEME_KEY, (error, result) => {
                    if (error) {
                        log.error('Theme key not found', error);
                        resolve(null);
                    }
                    else {
                        log.info('Theme key found', result);
                        resolve(result[THEME_KEY].values);
                    }
                });
            }
            catch (error) {
                log.error(`Couldn't get theme info`, error);
            }
        }
        else {
            resolve(null);
        }
    });
}
exports.getThemeRegistry = getThemeRegistry;
electron_1.nativeTheme.on('updated', () => {
    log.info(`theme updated, shouldUseDarkColors : ${electron_1.nativeTheme.shouldUseDarkColors}`);
    getThemeRegistry()
        .then((themeSettings) => {
        log.info('theme-updated, themeSettings = ', themeSettings);
        if (themeSettings) {
            electron_1.app.emit('notify-windows-mode', themeSettings);
        }
    })
        .catch((error) => {
        log.error('Error getting theme registry:', error);
    });
});

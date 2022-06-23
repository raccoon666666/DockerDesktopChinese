"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerElectronAPIsIpcHandlers = void 0;
const electron_fetch_1 = __importDefault(require("electron-fetch"));
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const window_manager_1 = require("../window-manager");
const docker_compose_1 = require("./docker-compose");
const terminal_1 = require("./terminal");
function registerElectronAPIsIpcHandlers() {
    electron_1.ipcMain.on('window-height', (event, height) => {
        // @ts-expect-error
        const window = event.sender.getOwnerBrowserWindow();
        const [width] = window.getSize();
        window.setSize(width, height);
    });
    electron_1.ipcMain.handle('close-ui', () => {
        electron_1.app.quit();
    });
    electron_1.ipcMain.handle('open-dev-tools', (event) => {
        event.sender
            // @ts-expect-error
            .getOwnerBrowserWindow()
            .webContents.openDevTools({ mode: 'detach' });
    });
    electron_1.ipcMain.handle('hide-current-window', (event) => {
        // @ts-expect-error
        const currentWindow = event.sender.getOwnerBrowserWindow();
        currentWindow.hide();
    });
    electron_1.ipcMain.handle('close-current-window', (event) => {
        // @ts-expect-error
        const currentWindow = event.sender.getOwnerBrowserWindow();
        currentWindow.close();
    });
    electron_1.ipcMain.handle('maximize-window', (event) => {
        // @ts-expect-error
        const currentWindow = event.sender.getOwnerBrowserWindow();
        if (currentWindow.isMaximized()) {
            currentWindow.unmaximize();
        }
        else {
            currentWindow.maximize();
        }
    });
    electron_1.ipcMain.handle('minimize-window', (event) => {
        // @ts-expect-error
        const currentWindow = event.sender.getOwnerBrowserWindow();
        currentWindow.minimize();
    });
    electron_1.ipcMain.handle('set-title', (event, title) => {
        // @ts-expect-error
        const currentWindow = event.sender.getOwnerBrowserWindow();
        currentWindow.setTitle(`${title}${electron_1.app.isPackaged ? '' : ' [DEV]'}`);
    });
    electron_1.ipcMain.handle('container-action-exec', (_, command) => {
        log.info(`received: container-action-exec, command: ${command}`);
        (0, terminal_1.open)(command);
    });
    electron_1.ipcMain.handle('compose-action', (_, actionName, labels) => {
        log.info(`received: compose-action, actionName: ${actionName}`);
        return (0, docker_compose_1.composeAction)(actionName, labels);
    });
    electron_1.ipcMain.handle('fetch-data', async (_, url) => {
        try {
            const res = await (0, electron_fetch_1.default)(url);
            const data = await res.json();
            return data;
        }
        catch (error) {
            log.error(`Error fetching ${url}:`, error);
            throw error;
        }
    });
    electron_1.ipcMain.on('get-theme', (event) => {
        // eslint-disable-next-line no-param-reassign
        event.returnValue = electron_1.nativeTheme.shouldUseDarkColors;
    });
    electron_1.ipcMain.handle('show-message-box', (_event, dialogProperties) => electron_1.dialog.showMessageBox(dialogProperties));
    electron_1.ipcMain.handle('open-file', (_event, filename) => {
        const absolutePath = electron_1.app.isPackaged
            ? path_1.default.resolve(process.resourcesPath, filename)
            : path_1.default.resolve(electron_1.app.getAppPath(), filename);
        log.info('open-file:', absolutePath);
        electron_1.shell.openPath(absolutePath).then((err) => {
            if (err !== '') {
                log.error(`Failed to open file (${absolutePath}): ${err}`);
            }
        });
    });
    electron_1.ipcMain.handle('open-dialog', (_event, dialogProperties) => electron_1.dialog.showOpenDialog(dialogProperties));
    electron_1.ipcMain.handle('save-dialog', (_, name) => electron_1.dialog.showSaveDialog({ defaultPath: name }));
    electron_1.ipcMain.handle('change-route', (_, route) => {
        (0, window_manager_1.showView)({ name: route });
    });
}
exports.registerElectronAPIsIpcHandlers = registerElectronAPIsIpcHandlers;

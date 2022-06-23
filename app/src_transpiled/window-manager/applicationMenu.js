"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplicationMenu = void 0;
// Rewrite default menu from Electron, to prevent from accessing UI code + enable shortcuts for UI inputs
const electron_1 = require("electron");
const desktop_go_backend_1 = require("../api-client/desktop-go-backend");
const index_1 = require("./index");
const template = [
    {
        label: 'Docker Desktop',
        submenu: [
            {
                label: 'About',
                click() {
                    (0, index_1.showView)({ name: 'about' });
                },
            },
            { type: 'separator' },
            {
                label: 'Quit Docker Desktop',
                click() {
                    desktop_go_backend_1.desktopGoBackend.quitDesktop();
                },
            },
        ],
    },
    {
        label: 'Edit',
        submenu: [
            { label: 'Undo', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
            {
                label: 'Redo',
                accelerator: 'Shift+CmdOrCtrl+Z',
                role: 'redo',
            },
            { type: 'separator' },
            { label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut' },
            { label: 'Copy', accelerator: 'CmdOrCtrl+C', role: 'copy' },
            { label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste' },
            {
                label: 'Select All',
                accelerator: 'CmdOrCtrl+A',
                role: 'selectAll',
            },
        ],
    },
];
function createApplicationMenu() {
    electron_1.Menu.setApplicationMenu(electron_1.Menu.buildFromTemplate(template));
}
exports.createApplicationMenu = createApplicationMenu;

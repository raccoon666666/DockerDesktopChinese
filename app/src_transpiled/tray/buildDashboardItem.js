"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDashboardItem = void 0;
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const desktop_go_backend_1 = require("../api-client/desktop-go-backend");
const window_manager_1 = require("../window-manager");
function buildDashboardItem(restrictionBroken) {
    return {
        label: restrictionBroken ? 'Contact your admin' : 'Dashboard',
        icon: electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'assets', `icon_dashboard_${electron_1.nativeTheme.shouldUseDarkColors ? 'white' : 'black'}.png`)),
        async click() {
            desktop_go_backend_1.desktopGoBackend.track('actionMenuDashboardContainers');
            (0, window_manager_1.showView)({ name: 'dashboard' });
        },
    };
}
exports.buildDashboardItem = buildDashboardItem;

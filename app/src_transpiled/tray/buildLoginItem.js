"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLoginItem = void 0;
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const startCase_1 = __importDefault(require("lodash/startCase"));
const desktop_go_backend_1 = require("../api-client/desktop-go-backend");
function buildLoginItem(login, loginRestricted = false) {
    const icon = electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'assets', `icon_user_${electron_1.nativeTheme.shouldUseDarkColors ? 'dark' : 'light'}.png`));
    if (login.type !== 'LoginSuccess') {
        return {
            icon,
            label: loginRestricted
                ? 'Sign in (required by your admin)'
                : 'Sign in / Create Docker ID',
            async click() {
                desktop_go_backend_1.desktopGoBackend.track('actionMenuCloudLogin');
                desktop_go_backend_1.desktopGoBackend.openBrowserForLogin();
            },
        };
    }
    const { planName } = login.entitlements;
    return {
        icon,
        label: login.username ?? '',
        submenu: [
            { label: `${(0, startCase_1.default)(planName)} Tier`, enabled: false },
            ...(planName === 'personal'
                ? [
                    {
                        label: 'Upgrade',
                        async click() {
                            desktop_go_backend_1.desktopGoBackend.track('actionMenuUpgradeAccount');
                            electron_1.shell.openExternal('https://hub.docker.com/billing/plan/update??utm_source=docker&utm_medium=inproductad&utm_campaign=20-11nurturedesktopupgradecampaignwhale');
                        },
                    },
                ]
                : []),
            {
                label: 'Account Settings',
                async click() {
                    electron_1.shell.openExternal('https://hub.docker.com/settings/general');
                },
            },
            {
                label: 'Sign Out',
                async click() {
                    desktop_go_backend_1.desktopGoBackend.track('actionMenuCloudLogout');
                    desktop_go_backend_1.desktopGoBackend.registryLogout();
                },
            },
        ],
    };
}
exports.buildLoginItem = buildLoginItem;

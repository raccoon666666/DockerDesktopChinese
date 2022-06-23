"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTray = void 0;
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
const desktop_go_backend_1 = require("../api-client/desktop-go-backend");
const tray_icons_1 = require("./tray-icons");
const theme_1 = require("../service/theme");
const window_manager_1 = require("../window-manager");
const buildKubernetesStatusItem_1 = require("./buildKubernetesStatusItem");
const buildKubernetesItem_1 = require("./buildKubernetesItem");
const buildUpdateIcon_1 = require("./buildUpdateIcon");
const buildRestartItem_1 = require("./buildRestartItem");
const buildSwitchEngineModeItem_1 = require("./buildSwitchEngineModeItem");
const buildDashboardItem_1 = require("./buildDashboardItem");
const buildUpdateItem_1 = require("./buildUpdateItem");
const buildLoginItem_1 = require("./buildLoginItem");
const buildPauseItem_1 = require("./buildPauseItem");
const buildEngineStatusItem_1 = require("./buildEngineStatusItem");
const login_1 = require("../events/login");
const buildDockerConItem_1 = require("./buildDockerConItem");
const update_1 = require("../events/update");
const license_1 = require("../events/license");
const buildQuitItem_1 = require("./buildQuitItem");
let lastTheme = null;
let tray;
let trayIconState = 'normal';
let containerMode = 'linux';
let loginRestricted = (0, login_1.isLoginRestricted)(login_1.initialLoginState);
let loginRestrictionBroken = (0, login_1.isLoginRestrictionBroken)(login_1.initialLoginState);
let licenseHasBeenAccepted = false;
let backendState = 'stopped';
let updateStatus;
let loginState = login_1.initialLoginState;
const separatorItem = {
    type: 'separator',
};
let engineStatusItem = null;
let kubernetesStatusItem = null;
const showDockerConLink = () => new Date().valueOf() < new Date(2022, 4, 17).valueOf();
let dockerConItem = (0, buildDockerConItem_1.buildDockerConItem)();
let dashboardItem = (0, buildDashboardItem_1.buildDashboardItem)(loginRestrictionBroken);
electron_1.nativeTheme.on('updated', () => {
    log.info(`theme updated, shouldUseDarkColors : ${electron_1.nativeTheme.shouldUseDarkColors}`);
    loginItem = (0, buildLoginItem_1.buildLoginItem)(loginState, loginRestricted);
    dashboardItem = (0, buildDashboardItem_1.buildDashboardItem)(loginRestrictionBroken);
    dockerConItem = (0, buildDockerConItem_1.buildDockerConItem)();
    updateItem = updateItem
        ? {
            ...updateItem,
            // Only change the update icon when there's an update icon
            icon: updateItem.icon && (0, buildUpdateIcon_1.buildUpdateIcon)(),
        }
        : null;
    desktop_go_backend_1.desktopGoBackend.getPauseState().then((pauseState) => {
        pauseItem = (0, buildPauseItem_1.buildPauseItem)(pauseState);
        setContextMenu();
    });
    quitItem = (0, buildQuitItem_1.buildQuitItem)();
    restartItem = (0, buildRestartItem_1.buildRestartItem)(updateStatus);
    setContextMenu();
});
const settingsItem = {
    label: __DARWIN__ ? 'Preferences...' : '设置',
    accelerator: 'CmdOrCtrl+,',
    async click() {
        desktop_go_backend_1.desktopGoBackend.track('actionMenuSettings');
        (0, window_manager_1.showView)({ name: 'settings' });
    },
};
let updateItem = null;
let switchEngineModeItem;
const troubleshootItem = {
    label: '调试',
    async click() {
        desktop_go_backend_1.desktopGoBackend.track('actionMenuFeedback');
        (0, window_manager_1.showView)({ name: 'troubleshoot' });
    },
};
const aboutItem = {
    label: '关于Docker Desktop',
    async click() {
        desktop_go_backend_1.desktopGoBackend.track('actionMenuAbout');
        (0, window_manager_1.showView)({ name: 'about' });
    },
};
const documentationItem = {
    label: '文档',
    async click() {
        desktop_go_backend_1.desktopGoBackend.track('actionMenuDocumentation');
        electron_1.shell.openExternal(`https://docs.docker.com/docker-for-${__WIN32__ ? 'windows' : 'mac'}/`);
    },
};
const quickStartGuideItem = {
    label: '开始引导',
    async click() {
        desktop_go_backend_1.desktopGoBackend.track('actionMenuQuickStartGuide');
        (0, window_manager_1.showView)({ name: 'tutorial' });
    },
};
let dockerHubItem = null;
function buildDockerHubItem(versions) {
    return {
        label: 'DockerHub',
        async click() {
            desktop_go_backend_1.desktopGoBackend.track('actionMenuOpenStore');
            electron_1.shell.openExternal(`https://hub.docker.com/?utm_source=${__WIN32__ ? 'docker4win' : 'docker4mac'}_${versions.appVersion}&utm_medium=hub&utm_campaign=referral`);
        },
    };
}
let loginItem = null;
let pauseItem;
let kubernetesItem = null;
let restartItem;
let quitItem = (0, buildQuitItem_1.buildQuitItem)();
let animatingTimer = null;
function animateTray(engineState) {
    if (!tray)
        return;
    if (engineState === 'error') {
        tray.setImage(path_1.default.join(__dirname, 'assets', __WIN32__ ? 'systray-icon-red.ico' : 'statusItemIcon-5Template.png'));
    }
    else if (engineState !== 'running') {
        if (!animatingTimer) {
            let currentFrame = 0;
            let increment = 1;
            animatingTimer = setInterval(() => {
                tray?.setImage((0, tray_icons_1.getTrayIcon)(lastTheme, currentFrame));
                if (currentFrame === 0) {
                    increment = 1;
                }
                else if (currentFrame === 5) {
                    increment = -1;
                }
                currentFrame += increment;
            }, 100);
        }
    }
    else {
        setTrayIcon();
        clearInterval(animatingTimer);
        animatingTimer = null;
    }
}
let updateTimer = null;
function setTrayIconByUpdateStatus(status) {
    if (status === 'waitingForDownload' && animatingTimer) {
        // don't set Tray icon to update at startup but remember its update state to show update icon when startup animation finishes
        trayIconState = 'update';
        return;
    }
    if (['waitingForDownload', 'startingDownload', 'readyToInstall'].includes(status)) {
        tray?.setImage((0, tray_icons_1.getUpdateTrayIcon)(lastTheme));
        trayIconState = 'update';
        clearInterval(updateTimer);
        updateTimer = null;
    }
    else if (status === 'downloading') {
        if (!updateTimer) {
            let currentFrame = 0;
            updateTimer = setInterval(() => {
                tray?.setImage((0, tray_icons_1.getSyncTrayIcon)(lastTheme, currentFrame));
                currentFrame = (currentFrame + 1) % 6;
            }, 100);
            trayIconState = 'sync';
        }
    }
    else {
        clearInterval(updateTimer);
        updateTimer = null;
        trayIconState = loginRestricted ? 'blocked' : 'normal';
        setTrayIcon();
    }
}
async function initTray() {
    electron_1.app.on('window-all-closed', (event) => {
        // To avoid closing the whale menu
        event.preventDefault();
        // On Mac, the Electron tray make a dock icon appear by default. Remove it if there's no BrowserWindow running
        if (__DARWIN__ && electron_1.app.dock && electron_1.app.dock.hide) {
            electron_1.app.dock.hide();
        }
    });
    const themeSettings = await (0, theme_1.getThemeRegistry)();
    log.info('load tray icon, themeSettings = ', themeSettings);
    if (themeSettings) {
        lastTheme = themeSettings;
    }
    tray = new electron_1.Tray((0, tray_icons_1.getTrayIcon)(lastTheme));
    tray.setToolTip('Docker Desktop');
    desktop_go_backend_1.desktopGoBackend
        .getVersions()
        .then((versions) => {
        dockerHubItem = buildDockerHubItem(versions);
        setContextMenu();
    })
        .catch((error) => {
        log.error('Error getting initial versions:', error);
    });
    Promise.allSettled([
        desktop_go_backend_1.desktopGoBackend.getPauseState().then((pauseState) => {
            pauseItem = (0, buildPauseItem_1.buildPauseItem)(pauseState);
            setContextMenu();
            return pauseState;
        }),
        desktop_go_backend_1.desktopGoBackend.getDockerState().then((engine) => {
            const { state, mode } = engine;
            backendState = state;
            engineStatusItem = (0, buildEngineStatusItem_1.buildEngineStatusItem)(state, false, loginRestricted);
            switchEngineModeItem = (0, buildSwitchEngineModeItem_1.buildSwitchEngineModeItem)(mode);
            containerMode = mode;
            setContextMenu();
            setTrayTitle(state);
            animateTray(state);
            return engine;
        }),
        desktop_go_backend_1.desktopGoBackend.getKubernetes(),
    ]).then(([pauseResult, stateResult, kubernetesResult]) => {
        if (pauseResult.status === 'fulfilled' &&
            stateResult.status === 'fulfilled' &&
            kubernetesResult.status === 'fulfilled') {
            backendState = stateResult.value.state;
            engineStatusItem = (0, buildEngineStatusItem_1.buildEngineStatusItem)(stateResult.value.state, pauseResult.value.isPaused, loginRestricted);
            setTrayTitle(stateResult.value.state, pauseResult.value.isPaused);
            kubernetesStatusItem = (0, buildKubernetesStatusItem_1.buildKubernetesStatusItem)(kubernetesResult.value, pauseResult.value.isPaused);
            hideKubernetesItems();
        }
        else {
            log.error('Error getting initial pause/engine/kubernetes state:', pauseResult, stateResult, kubernetesResult);
        }
    });
    (0, buildKubernetesItem_1.fetchInfoAndCreateKubernetesItem)().then((item) => {
        if (item) {
            kubernetesItem = item;
            hideKubernetesItems();
            setContextMenu();
        }
    });
    // @ts-expect-error custom event, not Electron event
    electron_1.app.on('notify-pause-state', async (message) => {
        const pauseState = message.payload;
        pauseItem = (0, buildPauseItem_1.buildPauseItem)(pauseState);
        Promise.allSettled([
            desktop_go_backend_1.desktopGoBackend.getDockerState(),
            desktop_go_backend_1.desktopGoBackend.getKubernetes(),
        ]).then(([stateResult, kubernetesResult]) => {
            if (stateResult.status === 'fulfilled' &&
                kubernetesResult.status === 'fulfilled') {
                backendState = stateResult.value.state;
                engineStatusItem = (0, buildEngineStatusItem_1.buildEngineStatusItem)(stateResult.value.state, pauseState.isPaused, loginRestricted);
                setTrayTitle(stateResult.value.state, pauseState.isPaused);
                kubernetesStatusItem = (0, buildKubernetesStatusItem_1.buildKubernetesStatusItem)(kubernetesResult.value, pauseState.isPaused);
                setContextMenu();
            }
            else {
                log.error('Error getting engine/kubernetes state:', stateResult, kubernetesResult);
            }
        });
    });
    // @ts-expect-error custom event, not Electron event
    electron_1.app.on('notify-kubernetes-context-changed', () => {
        (0, buildKubernetesItem_1.fetchInfoAndCreateKubernetesItem)().then((item) => {
            if (item) {
                kubernetesItem = item;
                setContextMenu();
            }
        });
    });
    const kubeConfig = path_1.default.join(os_1.default.homedir(), '.kube/config');
    try {
        fs_1.default.watchFile(kubeConfig, () => {
            (0, buildKubernetesItem_1.fetchInfoAndCreateKubernetesItem)().then((item) => {
                if (item) {
                    kubernetesItem = item;
                    setContextMenu();
                }
            });
        });
    }
    catch (error) {
        log.error('Error starting to watch .kube/config:', error);
        fs_1.default.unwatchFile(kubeConfig);
    }
    update_1.updateEventSource.on((update) => {
        updateItem = (0, buildUpdateItem_1.buildUpdateItem)(update.updateStatus);
        restartItem = (0, buildRestartItem_1.buildRestartItem)(update.updateStatus);
        setTrayIconByUpdateStatus(update.updateStatus);
        updateStatus = update.updateStatus;
        setContextMenu();
    }, true);
    // @ts-expect-error custom event, not Electron event
    electron_1.app.on('notify-kubernetes-state', (message) => {
        kubernetesStatusItem = (0, buildKubernetesStatusItem_1.buildKubernetesStatusItem)(message.payload);
        setContextMenu();
    });
    login_1.loginEventSource.on((state) => {
        loginState = state;
        loginRestricted = (0, login_1.isLoginRestricted)(state);
        loginRestrictionBroken = (0, login_1.isLoginRestrictionBroken)(state);
        loginItem = (0, buildLoginItem_1.buildLoginItem)(state, loginRestricted);
        dashboardItem = (0, buildDashboardItem_1.buildDashboardItem)(loginRestrictionBroken);
        engineStatusItem = (0, buildEngineStatusItem_1.buildEngineStatusItem)(backendState, false, loginRestricted);
        setTrayIconByUpdateStatus(updateStatus);
        if (showDockerConLink()) {
            if (state.type === 'LoginSuccess') {
                dockerConItem = (0, buildDockerConItem_1.buildDockerConItem)(state.username);
            }
            else {
                dockerConItem = (0, buildDockerConItem_1.buildDockerConItem)();
            }
        }
        setContextMenu();
    }, true);
    license_1.licenseEventSource.on((license) => {
        licenseHasBeenAccepted = license.hasBeenAccepted;
        setContextMenu();
    }, true);
    // @ts-expect-error custom event, not Electron event
    electron_1.app.on('notify-engine-state', (message) => {
        const { state, mode } = message.payload;
        if (state === 'quit') {
            log.info('Docker Desktop is quitting, destroying Whale icon');
            tray?.destroy();
            tray = null;
            return;
        }
        backendState = state;
        engineStatusItem = (0, buildEngineStatusItem_1.buildEngineStatusItem)(state, false, loginRestricted);
        setTrayTitle(state);
        switchEngineModeItem = (0, buildSwitchEngineModeItem_1.buildSwitchEngineModeItem)(mode);
        containerMode = mode;
        hideKubernetesItems();
        setContextMenu();
        animateTray(state);
    });
    // @ts-expect-error custom event, not Electron event
    // particularly for Windows mode
    electron_1.app.on('notify-windows-mode', (theme) => {
        lastTheme = theme;
        setTrayIcon();
    });
    updateItem = (0, buildUpdateItem_1.buildUpdateItem)('upToDate');
    restartItem = (0, buildRestartItem_1.buildRestartItem)('upToDate');
    setContextMenu();
    electron_1.app.on('before-quit', () => {
        tray?.destroy();
        tray = null;
    });
    if (__WIN32__) {
        tray.on('click', () => {
            (0, window_manager_1.showView)({ name: 'dashboard' });
        });
    }
}
exports.initTray = initTray;
function setTrayTitle(engineState, isPaused = false) {
    if (isPaused) {
        tray?.setToolTip('Docker Desktop paused');
    }
    else {
        tray?.setToolTip(`Docker Desktop ${engineState}`);
    }
}
function setTrayIcon() {
    if (trayIconState === 'blocked' && shouldShowBlockedIcon()) {
        tray?.setImage((0, tray_icons_1.getBlockedTrayIcon)(lastTheme));
        return;
    }
    switch (trayIconState) {
        case 'normal':
            tray?.setImage((0, tray_icons_1.getTrayIcon)(lastTheme));
            break;
        case 'update':
            tray?.setImage((0, tray_icons_1.getUpdateTrayIcon)(lastTheme));
            break;
        case 'sync':
            tray?.setImage((0, tray_icons_1.getSyncTrayIcon)(lastTheme));
            break;
        default:
            break;
    }
}
function shouldShowBlockedIcon() {
    return backendState !== 'starting' && backendState !== 'stopped';
}
function hideKubernetesItems() {
    if (containerMode === 'windows') {
        if (kubernetesStatusItem) {
            kubernetesStatusItem.visible = false;
        }
        if (kubernetesItem) {
            kubernetesItem.visible = false;
        }
    }
    else {
        if (kubernetesStatusItem) {
            kubernetesStatusItem.visible = true;
        }
        if (kubernetesItem) {
            kubernetesItem.visible = true;
        }
    }
}
function defaultMenuItems() {
    return [
        engineStatusItem,
        kubernetesStatusItem,
        separatorItem,
        licenseHasBeenAccepted ? dashboardItem : null,
        licenseHasBeenAccepted ? loginItem : null,
        licenseHasBeenAccepted ? separatorItem : null,
        licenseHasBeenAccepted ? settingsItem : null,
        updateItem,
        licenseHasBeenAccepted ? troubleshootItem : null,
        licenseHasBeenAccepted ? switchEngineModeItem : null,
        aboutItem,
        separatorItem,
        documentationItem,
        licenseHasBeenAccepted ? quickStartGuideItem : null,
        dockerHubItem,
        showDockerConLink() ? dockerConItem : null,
        separatorItem,
        licenseHasBeenAccepted ? kubernetesItem : null,
        separatorItem,
        licenseHasBeenAccepted ? pauseItem : null,
        licenseHasBeenAccepted ? restartItem : null,
        quitItem,
    ];
}
function restrictedMenuItems() {
    return [
        engineStatusItem,
        licenseHasBeenAccepted && loginRestrictionBroken ? dashboardItem : null,
        licenseHasBeenAccepted && !loginRestrictionBroken ? loginItem : null,
        separatorItem,
        aboutItem,
        separatorItem,
        quitItem,
    ];
}
function setContextMenu() {
    log.info(`rebuilding menu items with licenseHasBeenAccepted: ${licenseHasBeenAccepted} and loginRestricted: ${loginRestricted}`);
    const items = loginRestricted ? restrictedMenuItems() : defaultMenuItems();
    const menu = electron_1.Menu.buildFromTemplate(items.filter((item) => !!item));
    if (__DARWIN__ || __WIN32__) {
        menu.on('menu-will-show', () => {
            desktop_go_backend_1.desktopGoBackend.showNps();
        });
    }
    tray?.setContextMenu(menu);
}

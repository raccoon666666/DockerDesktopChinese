"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDashboardPageIpcHandlers = void 0;
// eslint-disable-next-line import/no-extraneous-dependencies
const electron_1 = require("electron");
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
const child_process_1 = require("child_process");
const url_1 = require("url");
const minimist_1 = __importDefault(require("minimist"));
const serialiseForIpc_1 = require("./serialiseForIpc");
const socket_client_1 = require("../api-client/socket-client");
const desktop_extensions_1 = require("./desktop-extensions");
const params = (0, minimist_1.default)(process.argv);
const exec = util_1.default.promisify(child_process_1.exec);
async function execCommand(cmd) {
    try {
        return await exec(cmd);
    }
    catch (e) {
        // Errors get some special handling by electron when sent over IPC, this
        // ugly ugly piece of code makes it so that the error returned contains
        // stderr/stdout even if the command failed.
        return JSON.parse(JSON.stringify(e));
    }
}
function spawnCommand(port, cmd, args) {
    try {
        const command = (0, child_process_1.spawn)(cmd, args);
        // ensure child process is killed when closing dashboard window
        electron_1.ipcMain.emit('child-pid', command.pid);
        // kill child process when client connection is closed (webview is shutdown)
        port.on('close', () => {
            console.log('closing spawn process, client side connection closed');
            command.kill();
        });
        port.start();
        command.stdout.on('data', (data) => {
            port.postMessage({ stdout: data });
        });
        command.stderr.on('data', (data) => {
            port.postMessage({ stderr: data });
        });
        command.on('close', (code) => {
            port.postMessage({ close: true, code });
            port.close();
        });
    }
    catch (e) {
        port.postMessage({ error: JSON.parse(JSON.stringify(e)) });
    }
}
function dockerCmdInVm(container, cmd) {
    return execCommand(`docker exec ${container} ${cmd}`);
}
const extensionsRoot = getExtensionsRoot();
function getExtensionsRoot() {
    if (__DARWIN__) {
        return `${os_1.default.homedir()}/Library/Containers/com.docker.docker/Data/extensions`;
    }
    if (__WIN32__) {
        return `${os_1.default.homedir()}\\AppData\\Roaming\\Docker\\extensions`;
    }
    // __LINUX__
    return `${os_1.default.homedir()}/.docker/desktop/extensions`;
}
async function execHostCmd(name, cmd) {
    return execCommand(`${path_1.default.resolve(extensionsRoot, name, 'host')}${path_1.default.sep}${cmd}`);
}
async function spawnHostCmd(port, name, cmd, args) {
    return spawnCommand(port, `${path_1.default.resolve(extensionsRoot, name, 'host')}${path_1.default.sep}${cmd}`, args);
}
function execDockerCmd(cmd, ...args) {
    return execCommand(`docker ${cmd} ${args?.join(' ')}`);
}
function spawnDockerCmd(port, cmd, args) {
    spawnCommand(port, 'docker', [cmd, ...args]);
}
function spawnInVMExtension(port, cmd, args, container) {
    spawnCommand(port, 'docker', ['exec', container, cmd, ...args]);
}
function registerExtensionBackend(name, socket) {
    const extensionAccess = new socket_client_1.SocketClient({ socketPath: socket });
    electron_1.ipcMain.handle(`${name}-backend-request`, (_event, config) => {
        console.log(`request on backend ${name} invoked`);
        return extensionAccess.request(config);
    });
    electron_1.ipcMain.handle(`${name}-vm-docker-cmd`, async (_event, container, cmd, args) => {
        console.log(`vm cmd invoked from ${name}`);
        const res = await dockerCmdInVm(container, `${cmd} ${args?.join(' ')}`);
        return res;
    });
    electron_1.ipcMain.handle(`${name}-exec-cmd`, async (_event, cmd, args) => {
        console.log(`host cmd invoked from ${name}`);
        const res = await execHostCmd(name, `${cmd} ${args?.join(' ')}`);
        return res;
    });
    electron_1.ipcMain.on(`${name}-spawn-cmd`, async (event, a) => {
        console.log(`host cmd invoked from ${name}`);
        const [port] = event.ports;
        const res = await spawnHostCmd(port, name, a.cmd, a.args);
        return res;
    });
    electron_1.ipcMain.handle(`${name}-exec-docker-cmd`, async (_event, cmd, ...args) => {
        console.log(`host docker cmd invoked from ${name}`);
        const res = await execDockerCmd(cmd, ...args);
        return res;
    });
    electron_1.ipcMain.on(`${name}-spawn-docker-cmd`, async (event, a) => {
        console.log(`host docker cmd invoked from ${name}`);
        const [port] = event.ports;
        spawnDockerCmd(port, a.cmd, a.args);
    });
    electron_1.ipcMain.on(`${name}-spawn-vm`, async (event, a) => {
        console.log(`host cmd invoked from ${name}`);
        const [port] = event.ports;
        spawnInVMExtension(port, a.cmd, a.args, a.container);
    });
}
function svgData(file) {
    try {
        return file
            ? // eslint-disable-next-line no-buffer-constructor
                `data:image/svg+xml;base64,${new Buffer(fs_1.default.readFileSync(file)).toString('base64')}`
            : undefined;
    }
    catch {
        return undefined;
    }
}
function registerDashboardPageIpcHandlers() {
    electron_1.ipcMain.handle('get-installed-extensions', (0, serialiseForIpc_1.serialiseForIpc)(async () => {
        const extensions = await desktop_extensions_1.desktopExtensionsBackend.getExtensions();
        extensions.forEach((e) => {
            if (e.manifest.backend) {
                try {
                    registerExtensionBackend(e.folderName, e.manifest.backend.socket);
                }
                catch (err) {
                    log.error(err);
                    // do nothing! currently we re-register extensions whenever the UI asks for routes,
                    // but we should do it on application start instead, so we only do it once
                }
            }
        });
        return extensions.flatMap((e) => {
            const devPort = params[`extension-${e.name}-devPort`];
            const { menu } = e.manifest;
            return {
                name: e.folderName,
                title: menu.title,
                icon: svgData(e.icon),
                contentUrl: getContentUrl(e, devPort),
                preloadScriptUrl: preloadScriptUrl(),
                debugMode: menu.debugMode,
                updateInfo: menu.updateInfo,
            };
        });
    }));
}
exports.registerDashboardPageIpcHandlers = registerDashboardPageIpcHandlers;
function preloadScriptUrl() {
    try {
        return (0, url_1.pathToFileURL)(require.resolve('@docker/extension-preload')).href;
    }
    catch {
        return undefined;
    }
}
function getContentUrl(e, devPort) {
    const { menu } = e.manifest;
    let url = devPort ? `http://localhost:${devPort}` : (0, url_1.pathToFileURL)(menu.src);
    if (menu.src.startsWith('http')) {
        url = menu.src;
    }
    return withQueryString(url, {
        extensionName: e.folderName,
        hasBackend: (!!e.manifest.backend).toString(),
    });
}
function withQueryString(urlParam, qs) {
    const url = typeof urlParam === 'string' ? new url_1.URL(urlParam) : urlParam;
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(qs)) {
        url.searchParams.set(key, value);
    }
    return url.href;
}

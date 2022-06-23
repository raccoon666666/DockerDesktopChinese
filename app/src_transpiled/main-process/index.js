"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerIPCMainHandlers = void 0;
const shell_1 = require("./shell");
const pty_1 = require("./pty");
const dev_environments_backend_1 = require("../api-client/dev-environments-backend");
const docker_socket_1 = require("./docker-socket");
const docker_node_1 = require("./docker-node");
const docker_logs_1 = require("./docker-logs");
const api_client_1 = require("./api-client");
const api_electron_1 = require("./api-electron");
const ui_state_1 = require("./ui-state");
function registerIPCMainHandlers() {
    (0, shell_1.registerShellIpcHandlers)();
    (0, pty_1.registerPtyIpcHandlers)();
    (0, dev_environments_backend_1.registerDevEnvsIpcHandlers)();
    (0, docker_socket_1.registerDockerStreamIpcHandlers)();
    (0, docker_node_1.registerEngineAPIIpcHandlers)();
    (0, docker_logs_1.registerContainerLogIpcHandler)();
    (0, api_client_1.registerBackendAPIsIpcHandlers)();
    (0, api_electron_1.registerElectronAPIsIpcHandlers)();
    (0, ui_state_1.registerUIStateIpcHandlers)();
}
exports.registerIPCMainHandlers = registerIPCMainHandlers;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchInfoAndCreateKubernetesItem = void 0;
const child_process_1 = require("child_process");
const electron_1 = require("electron");
const util_1 = __importDefault(require("util"));
const desktop_go_backend_1 = require("../api-client/desktop-go-backend");
const exec = util_1.default.promisify(child_process_1.exec);
function buildKubernetesItem(k8sAvailable, k8sContexts, currentContext) {
    return {
        enabled: k8sAvailable,
        label: 'Kubernetes',
        submenu: [
            {
                enabled: false,
                label: 'Context',
            },
            // @ts-expect-error
            ...k8sContexts.map((k8sContext) => ({
                type: 'checkbox',
                checked: k8sContext === currentContext,
                label: k8sContext,
                async click() {
                    desktop_go_backend_1.desktopGoBackend.track('actionMenuKubernetesChangeContext');
                    setK8sContexts(k8sContext);
                    electron_1.app.emit('notify-kubernetes-context-changed');
                },
            })),
        ],
    };
}
async function fetchInfoAndCreateKubernetesItem() {
    return Promise.allSettled([
        isK8sAvailable(),
        getK8sContexts(),
        getK8sCurrentContext(),
    ]).then(([k8sAvailable, k8sContexts, k8sCurrentContext]) => {
        if (k8sAvailable.status === 'fulfilled' &&
            k8sContexts.status === 'fulfilled' &&
            k8sCurrentContext.status === 'fulfilled') {
            return buildKubernetesItem(k8sAvailable.value, k8sContexts.value, k8sCurrentContext.value);
        }
        return null;
    });
}
exports.fetchInfoAndCreateKubernetesItem = fetchInfoAndCreateKubernetesItem;
async function isK8sAvailable() {
    try {
        const { stdout } = await exec('kubectl --help');
        return !!stdout;
    }
    catch (error) {
        return false;
    }
}
async function getK8sCurrentContext() {
    const { stdout } = await exec('kubectl config current-context');
    return stdout.replace(/\n/g, '');
}
async function getK8sContexts() {
    const { stdout } = await exec('kubectl config get-contexts -o=name');
    return stdout.split('\n').filter((c) => c.length > 0);
}
async function setK8sContexts(name) {
    await exec(`kubectl config use-context ${name}`);
}

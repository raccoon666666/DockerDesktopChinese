"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerKubernetesEvents = void 0;
const electron_1 = require("electron");
const sse_1 = require("../api-client/sse");
const notifyAllWindows_1 = require("../window-manager/notifyAllWindows");
function registerKubernetesEvents() {
    (0, sse_1.registerEvents)('/kubernetes/events', (data) => {
        (0, notifyAllWindows_1.notifyAllWindows)({
            type: 'kubernetes.success',
            payload: data,
        });
        electron_1.app.emit('notify-kubernetes-state', {
            payload: data,
        });
    });
}
exports.registerKubernetesEvents = registerKubernetesEvents;

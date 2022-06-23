"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEngineEvents = void 0;
const electron_1 = require("electron");
const sse_1 = require("../api-client/sse");
const notifyAllWindows_1 = require("../window-manager/notifyAllWindows");
function registerEngineEvents() {
    (0, sse_1.registerEvents)('/engine/events', (data) => {
        (0, notifyAllWindows_1.notifyAllWindows)({
            type: 'engine.success',
            payload: data,
        });
        electron_1.app.emit('notify-engine-state', {
            payload: data,
        });
    });
}
exports.registerEngineEvents = registerEngineEvents;

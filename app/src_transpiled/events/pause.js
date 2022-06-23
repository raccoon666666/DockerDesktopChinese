"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPauseEvents = void 0;
const electron_1 = require("electron");
const sse_1 = require("../api-client/sse");
const notifyAllWindows_1 = require("../window-manager/notifyAllWindows");
function registerPauseEvents() {
    (0, sse_1.registerEvents)('/pause/events', (data) => {
        (0, notifyAllWindows_1.notifyAllWindows)({
            type: 'pause/success',
            payload: data,
        });
        electron_1.app.emit('notify-pause-state', {
            payload: data,
        });
    });
}
exports.registerPauseEvents = registerPauseEvents;

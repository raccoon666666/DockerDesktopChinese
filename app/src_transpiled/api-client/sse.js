"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEvents = exports.SSESource = void 0;
// @ts-expect-error Not typed yet
const node_eventsource_1 = __importDefault(require("@rumpl/node-eventsource"));
const headers_1 = require("./headers");
const backendSocket_1 = require("../service/backendSocket");
class SSESource {
    constructor(path) {
        this.listeners = [];
        this.path = path;
    }
    start({ disabledLogs } = { disabledLogs: false }) {
        this.eventSource = new node_eventsource_1.default({
            socketPath: (0, backendSocket_1.getBackendSocketByPlatform)(),
            path: this.path,
        }, {
            headers: (0, headers_1.headers)(),
        });
        // @ts-expect-error Not typed yet
        this.eventSource.onerror = (ev) => {
            log.error(this.path, 'failed:', ev.message);
        };
        this.eventSource.onmessage = (ev) => {
            const parsed = JSON.parse(ev.data);
            this.listeners.forEach((listener) => listener(parsed));
            this.cache = parsed;
            if (!disabledLogs) {
                log.info('received SSE data:', parsed);
            }
        };
    }
    close() {
        this.eventSource.close();
    }
    on(listener, sendCacheImmediately) {
        this.listeners.push(listener);
        if (this.cache && sendCacheImmediately) {
            listener(this.cache);
        }
        return {
            dispose: () => this.off(listener),
        };
    }
    off(listener) {
        const callbackIndex = this.listeners.indexOf(listener);
        if (callbackIndex > -1) {
            this.listeners.splice(callbackIndex, 1);
        }
    }
}
exports.SSESource = SSESource;
function registerEvents(path, callback) {
    const es = new node_eventsource_1.default({
        socketPath: (0, backendSocket_1.getBackendSocketByPlatform)(),
        path,
    }, {
        headers: (0, headers_1.headers)(),
    });
    // @ts-expect-error Not typed yet
    es.onerror = (ev) => {
        log.error(path, 'failed:', ev.message);
    };
    es.onmessage = (ev) => {
        callback(JSON.parse(ev.data));
    };
}
exports.registerEvents = registerEvents;

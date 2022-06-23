"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callSSE = void 0;
// @ts-expect-error Not typed yet
const node_eventsource_1 = __importDefault(require("@rumpl/node-eventsource"));
function callSSE(socketPath, port, path) {
    const es = new node_eventsource_1.default({
        socketPath,
        path,
    });
    // eslint-disable-next-line no-param-reassign
    port.on('message', (event) => {
        if (event.data === 'close') {
            es.close();
        }
    });
    port.start();
    // @ts-expect-error Not typed yet
    es.onerror = (ev) => {
        if (ev.message === undefined) {
            port.close();
            es.close();
        }
        else {
            port.postMessage({ error: ev.message });
            port.close();
            es.close();
        }
    };
    es.onmessage = (ev) => {
        port.postMessage(JSON.parse(ev.data));
    };
}
exports.callSSE = callSSE;

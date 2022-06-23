"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serialiseForIpc = void 0;
function serialiseForIpc(handler) {
    return async (event, ...args) => {
        try {
            const result = await handler(event, ...args);
            return { result };
        }
        catch (err) {
            return { error: { Message: err.toString() } };
        }
    };
}
exports.serialiseForIpc = serialiseForIpc;

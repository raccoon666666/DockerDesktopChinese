"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retry = void 0;
async function retry(fn, retries = 5, interval = 100) {
    try {
        const val = await fn();
        return val;
    }
    catch (error) {
        if (retries > 0) {
            await new Promise((r) => setTimeout(r, interval));
            return retry(fn, retries - 1, interval);
        }
        error.message = `Max retries reached: ${error.message}`;
        throw error;
    }
}
exports.retry = retry;

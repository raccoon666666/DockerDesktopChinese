"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamBuffer = void 0;
const bugsnag_1 = require("../bugsnag");
class StreamBuffer {
    constructor(context) {
        this.context = context;
        this.buffer = '';
    }
    onData(chunk) {
        const data = this.buffer + chunk;
        let events = '';
        if (data.endsWith('\n')) {
            this.reset();
            events = data;
        }
        else {
            const lastIndexOfSeparator = data.lastIndexOf('\n');
            if (lastIndexOfSeparator === -1) {
                this.buffer = data;
                // Let's don't blow the memory and check how many users are still affected
                if (this.buffer.length >= 4096 * 64) {
                    this.reset();
                    bugsnag_1.bugsnagClient.notify(new Error(`Buffer overflow in stream buffer, context: ${this.context}`), (e) => {
                        e.context = this.context;
                        e.addMetadata('stream_buffer', {
                            data: this.buffer,
                        });
                    });
                }
            }
            else {
                events = data.substring(0, lastIndexOfSeparator + 1);
                this.buffer = data.substring(lastIndexOfSeparator + 1);
            }
        }
        return events.split('\n').filter((event) => event.length > 0);
    }
    reset() {
        this.buffer = '';
    }
}
exports.StreamBuffer = StreamBuffer;

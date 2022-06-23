"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventSource = void 0;
const sse_1 = require("../api-client/sse");
exports.updateEventSource = new sse_1.SSESource('/update/events');

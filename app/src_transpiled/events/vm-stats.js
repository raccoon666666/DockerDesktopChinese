"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vmStatsEventSource = void 0;
const sse_1 = require("../api-client/sse");
exports.vmStatsEventSource = new sse_1.SSESource('/vm/stats');

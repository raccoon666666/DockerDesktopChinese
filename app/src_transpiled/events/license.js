"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.licenseEventSource = void 0;
const sse_1 = require("../api-client/sse");
exports.licenseEventSource = new sse_1.SSESource('/license/events');

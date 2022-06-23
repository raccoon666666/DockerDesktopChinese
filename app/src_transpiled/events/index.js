"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSSEClients = void 0;
const login_1 = require("./login");
const update_1 = require("./update");
const license_1 = require("./license");
function startSSEClients() {
    login_1.loginEventSource.start();
    update_1.updateEventSource.start();
    license_1.licenseEventSource.start();
}
exports.startSSEClients = startSSEClients;

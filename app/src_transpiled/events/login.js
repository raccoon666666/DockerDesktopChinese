"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginEventSource = exports.isLoginRestrictionBroken = exports.isLoginRestricted = exports.initialLoginState = void 0;
const sse_1 = require("../api-client/sse");
exports.initialLoginState = {
    type: 'LoggedOutOK',
};
function isLoginRestricted(state) {
    return (state.type === 'LoggedOutRestricted' ||
        state.type === 'LoggedOutRestrictionBroken' ||
        state.type === 'LoginRejected' ||
        (state.type === 'CodeReceived' && state.restricted) ||
        (state.type === 'UserdataReceived' && state.restricted));
}
exports.isLoginRestricted = isLoginRestricted;
function isLoginRestrictionBroken(state) {
    return state.type === 'LoggedOutRestrictionBroken';
}
exports.isLoginRestrictionBroken = isLoginRestrictionBroken;
exports.loginEventSource = new sse_1.SSESource('/registry/state');

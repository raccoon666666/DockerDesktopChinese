"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewriteObjectDeep = void 0;
function rewriteObjectDeep(obj, func, visitedNodes = new Set()) {
    visitedNodes.add(obj);
    Object.entries(obj).forEach(([key, value]) => {
        if (isObj(value)) {
            if (!visitedNodes.has(value)) {
                rewriteObjectDeep(value, func, visitedNodes);
            }
            return;
        }
        // eslint-disable-next-line no-param-reassign
        obj[key] = func(value);
    });
}
exports.rewriteObjectDeep = rewriteObjectDeep;
function isObj(value) {
    return typeof value === 'object' && value !== null;
}

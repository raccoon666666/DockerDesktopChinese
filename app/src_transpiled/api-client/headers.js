"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.headers = void 0;
function getID() {
    return [...Array(8)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join('');
}
function headers() {
    return {
        'User-Agent': 'DockerDesktopElectron',
        'Desktop-Session-Id': getID(),
    };
}
exports.headers = headers;

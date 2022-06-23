"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64urlEncode = void 0;
// From https://simplycalc.com/base64-source.php
/* eslint-disable */
const b64u = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'; // base64url dictionary
const b64pad = '=';
function base64_encode_data(data, len, b64x) {
    let dst = '';
    let i;
    for (i = 0; i <= len - 3; i += 3) {
        dst += b64x.charAt(data.charCodeAt(i) >>> 2);
        dst += b64x.charAt(((data.charCodeAt(i) & 3) << 4) | (data.charCodeAt(i + 1) >>> 4));
        dst += b64x.charAt(((data.charCodeAt(i + 1) & 15) << 2) | (data.charCodeAt(i + 2) >>> 6));
        dst += b64x.charAt(data.charCodeAt(i + 2) & 63);
    }
    if (len % 3 == 2) {
        dst += b64x.charAt(data.charCodeAt(i) >>> 2);
        dst += b64x.charAt(((data.charCodeAt(i) & 3) << 4) | (data.charCodeAt(i + 1) >>> 4));
        dst += b64x.charAt((data.charCodeAt(i + 1) & 15) << 2);
        dst += b64pad;
    }
    else if (len % 3 == 1) {
        dst += b64x.charAt(data.charCodeAt(i) >>> 2);
        dst += b64x.charAt((data.charCodeAt(i) & 3) << 4);
        dst += b64pad;
        dst += b64pad;
    }
    return dst;
}
function base64urlEncode(str) {
    const utf8str = unescape(encodeURIComponent(str));
    return base64_encode_data(utf8str, utf8str.length, b64u);
}
exports.base64urlEncode = base64urlEncode;
;
/* eslint-enable */

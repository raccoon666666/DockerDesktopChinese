"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketClient = void 0;
const axios_1 = __importDefault(require("axios"));
const axios_error_1 = require("./axios-error");
const headers_1 = require("./headers");
function handleResponse(res) {
    log.info(`Response for ${res.request?.method} ${res.request?.path}`);
    // let's not log jwt token or any response type of blob (file download)
    if (res.request?.path !== '/registry/token' &&
        res.config.responseType !== 'stream') {
        log.info(JSON.stringify(res.data, null, '  '));
    }
    return res.data;
}
const handleErrorResponse = (url) => (err) => {
    // in most cases, this can be typed as never (because handleAxiosError re-throws the error)
    // but in a minority of cases this function returns undefined instead
    log.info(`Response error for ${url}: ${err?.message}`);
    if (!['/system/editor', '/analytics/track', '/usage'].includes(err.request?.path)) {
        (0, axios_error_1.handleAxiosError)(err);
    }
};
class SocketClient {
    constructor(axiosConfig) {
        this.client = axios_1.default.create({
            ...axiosConfig,
            // Issue: https://github.com/docker/for-win/issues/5551
            // Solution inpired by: https://janmolak.com/node-js-axios-behind-corporate-proxies-8b17a6f31f9d
            proxy: false,
        });
    }
    get(url, params = null) {
        return this.client
            .get(url, { params, headers: (0, headers_1.headers)() })
            .then(handleResponse)
            .catch(handleErrorResponse(url));
    }
    getBuffer(url, params = null) {
        return this.client
            .get(url, { params, headers: (0, headers_1.headers)(), responseType: 'stream' })
            .then(handleResponse)
            .catch((err) => {
            handleErrorResponse(url)(err);
            throw err; // otherwise the promise doesn't actually reject
        });
    }
    post(url, data = null) {
        return this.client
            .post(url, data, { headers: (0, headers_1.headers)() })
            .then(handleResponse)
            .catch(handleErrorResponse(url));
    }
    delete(url, params = null) {
        return this.client
            .delete(url, { params, headers: (0, headers_1.headers)() })
            .then(handleResponse)
            .catch(handleErrorResponse(url));
    }
    request(config) {
        return this.client
            .request({ ...config, headers: (0, headers_1.headers)() })
            .then(handleResponse)
            .catch(handleErrorResponse(config.url || ''));
    }
}
exports.SocketClient = SocketClient;

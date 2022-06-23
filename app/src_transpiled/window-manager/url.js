"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createURL = exports.getCompleteHash = void 0;
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const platform_1 = require("../service/platform");
const arch_1 = require("../service/arch");
const build_json_1 = __importDefault(require("../build.json"));
const getCompleteHash = (route, subPath) => subPath ? route.hash + subPath : route.hash;
exports.getCompleteHash = getCompleteHash;
const createURL = (route, opts) => {
    const queryParams = {
        bugsnagUserId: platform_1.identifier,
        opts: JSON.stringify(opts),
        e2eTests: process.env.NODE_ENV === 'test',
        shouldUseDarkColors: electron_1.nativeTheme.shouldUseDarkColors,
        isArm64: (0, arch_1.isArm64)(),
    };
    const hash = (0, exports.getCompleteHash)(route, opts?.path);
    if (build_json_1.default.devMode) {
        log.info('using dev config', hash);
        return url_1.default.format({
            hostname: 'localhost',
            port: 8089,
            protocol: 'http',
            slashes: true,
            hash,
            query: queryParams,
        });
    }
    log.info('using production config', hash);
    return url_1.default.format({
        pathname: path_1.default.join(__dirname, '..', '..', 'web', 'index.html'),
        protocol: 'file:',
        slashes: true,
        hash,
        query: queryParams,
    });
};
exports.createURL = createURL;

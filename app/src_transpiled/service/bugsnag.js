"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bugsnagClient = void 0;
const js_1 = __importDefault(require("@bugsnag/js"));
const platform_1 = require("./platform");
const build_json_1 = __importDefault(require("../build.json"));
const rewriteObjectDeep_1 = require("./rewriteObjectDeep");
const obfuscate = (value) => {
    // C:\Users\bill.gates\... on windows
    // /Users/steve.jobs/... on mac
    if (value) {
        return value.replace(/([\\/]Users[\\/])[^\\/]+([\\/])/gi, '$1[NOT COLLECTED]$2');
    }
    return value;
};
const groupReportByContext = (report) => {
    if (report.context) {
        // eslint-disable-next-line no-param-reassign
        report.groupingHash = report.context;
    }
    (0, rewriteObjectDeep_1.rewriteObjectDeep)(report, (x) => {
        switch (typeof x) {
            case 'string':
                return obfuscate(x);
            default:
                return x;
        }
    });
};
exports.bugsnagClient = js_1.default.start({
    user: {
        id: platform_1.identifier,
    },
    apiKey: build_json_1.default.bugsnagApiKey,
    appVersion: build_json_1.default.appVersion,
    onError: groupReportByContext,
    enabledReleaseStages: ['production'],
});

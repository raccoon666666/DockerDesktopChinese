"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArm64 = void 0;
const child_process_1 = require("child_process");
function isArm64() {
    if (process.arch === 'arm64') {
        return true;
    }
    // To be remove with higher Electron version which is able to do `process.arch = arm64`
    if (process.platform === 'darwin') {
        try {
            const result = (0, child_process_1.spawnSync)('/usr/sbin/sysctl', ['sysctl.proc_translated']);
            return result.stdout.includes('sysctl.proc_translated: 1');
        }
        catch (error) {
            return false;
        }
    }
    return false;
}
exports.isArm64 = isArm64;

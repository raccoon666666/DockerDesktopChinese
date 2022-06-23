"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifier = void 0;
const fs_1 = __importDefault(require("fs"));
function getUserId() {
    const win = `${process.env.APPDATA}\\Docker\\.trackID`;
    const linux = `${process.env.HOME}/.docker/desktop/userId`;
    const mac = `${process.env.HOME}/Library/Group Containers/group.com.docker/userId`;
    let path = win;
    if (__DARWIN__) {
        path = mac;
    }
    if (__LINUX__) {
        path = linux;
    }
    let userId;
    try {
        userId = fs_1.default.readFileSync(path, 'utf8');
    }
    catch (error) {
        userId = '[UNDEFINED_USER_ID]';
    }
    return userId;
}
exports.identifier = getUserId();

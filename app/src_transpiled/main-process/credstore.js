"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withCredStore = void 0;
const child_process_1 = require("child_process");
const base64_url_1 = require("./base64-url");
function withCredStore(fn) {
    let credStore = 'desktop-credential-pass';
    if (__WIN32__) {
        credStore = 'docker-credential-wincred.exe';
    }
    if (__DARWIN__) {
        credStore = 'docker-credential-osxkeychain';
    }
    const hubRegistryUrl = 'https://index.docker.io/v1/';
    const child = (0, child_process_1.exec)(`${credStore} get`, (error, stdout, stderr) => {
        if (error || stderr) {
            fn(error, null);
            return;
        }
        const stdoutObj = JSON.parse(stdout);
        const auth = {
            key: (0, base64_url_1.base64urlEncode)(JSON.stringify({
                username: stdoutObj.Username,
                password: stdoutObj.Secret,
                serveraddress: stdoutObj.ServerURL,
            })),
        };
        fn(null, auth);
    });
    // @ts-expect-error Started when we updated @types/node
    child.stdin.write(hubRegistryUrl);
    // @ts-expect-error Started when we updated @types/node
    child.stdin.end();
}
exports.withCredStore = withCredStore;

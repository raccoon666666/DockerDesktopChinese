"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerContainerLogIpcHandler = exports.toEntry = void 0;
const child_process_1 = require("child_process");
const electron_1 = require("electron");
const debounce_1 = __importDefault(require("lodash/debounce"));
const docker_compose_1 = require("../service/docker-compose");
const bugsnag_1 = require("../service/bugsnag");
const StreamBuffer_1 = require("../service/stream-buffer/StreamBuffer");
const regexLogWithTimesamp = /^(?:(\S*?)(?:\s+\|) )?(\S+?) (.*)$/s;
function cleanChunkLog(chunk) {
    return (chunk
        .toString('utf8')
        // https://github.com/docker/for-win/issues/11251
        .replace(/\n$/, '')
        .split('\n')
        .filter((s) => !s.match(/^Attaching.*$/))
        .filter((s) => !s.match(/^\S+ exited with code \d+$$/))
        // https://github.com/moby/moby/issues/7375#issuecomment-51462963
        .map(toEntry));
}
function notify(e, context) {
    bugsnag_1.bugsnagClient.notify(e, (error) => {
        // eslint-disable-next-line no-param-reassign
        error.context = context;
    });
}
const debouncedNotify = (0, debounce_1.default)(notify, 1000);
function toEntry(line) {
    const matches = line.match(regexLogWithTimesamp);
    if (!matches || matches.length !== 4) {
        debouncedNotify(new Error(`error parsing log entry: ${line}`), 'log parsing');
        return { timestamp: null, content: line };
    }
    const ts = new Date(matches[2]);
    const validDate = !Number.isNaN(ts.getTime());
    if (!validDate) {
        debouncedNotify(new Error(`error parsing log entry date: ${matches[2]}, from line: ${line}`), 'log date parsing');
    }
    return {
        timestamp: validDate ? ts : null,
        content: (matches[1] ? `${matches[1]} | ${matches[3]}` : matches[3])
            // eslint-disable-next-line no-control-regex
            .replace(/[\u0001\u0002]\u0000{3}.{4}/g, '')
            .replace(/ /g, '\u00a0'),
    };
}
exports.toEntry = toEntry;
function registerContainerLogIpcHandler() {
    electron_1.ipcMain.on('logs-stream', (event, payload) => {
        let stdout = null;
        let stderr = null;
        let pid = null;
        const [port] = event.ports;
        port.on('message', (e) => {
            if (e.data === 'close') {
                port.close();
                stdout?.destroy();
                stderr?.destroy();
                try {
                    if (pid)
                        process.kill(pid);
                }
                catch (error) {
                    log.error('Error trying to kill stream:', error);
                }
            }
        });
        port.start();
        let logs;
        if (payload.type === 'container') {
            logs = (0, child_process_1.spawn)('docker', [
                'logs',
                '-t',
                '-f',
                ...(payload.since ? ['--since', payload.since.toISOString()] : []),
                payload.id,
            ]);
        }
        else {
            logs = (0, child_process_1.spawn)('docker', [
                'compose',
                'logs',
                '--no-color',
                '-f',
                '-t',
                ...(payload.since ? ['--since', payload.since.toISOString()] : []),
            ], {
                cwd: payload.labels[docker_compose_1.LABEL_WORKING_DIR],
            });
        }
        stdout = logs.stdout;
        stderr = logs.stderr;
        pid = logs.pid;
        // Keep all child processes' id to kill all of them before quitting any window
        electron_1.ipcMain.emit('child-pid', pid);
        let history = [];
        const content = new StreamBuffer_1.StreamBuffer('parsing-log');
        stdout.setEncoding('utf8');
        stdout.on('data', (chunkLog) => {
            history = [
                ...history,
                ...content.onData(chunkLog).map(cleanChunkLog).flat(),
            ];
            port.postMessage(history);
        });
        stderr.setEncoding('utf8');
        stderr.on('data', (chunkLog) => {
            history = [
                ...history,
                ...content.onData(chunkLog).map(cleanChunkLog).flat(),
            ];
            port.postMessage(history);
        });
        logs.on('error', (error) => {
            log.error('error trying to get compose logs:', error);
        });
    });
}
exports.registerContainerLogIpcHandler = registerContainerLogIpcHandler;

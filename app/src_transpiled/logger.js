"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const path = __importStar(require("path"));
const util = __importStar(require("util"));
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const redact_secrets_1 = __importDefault(require("redact-secrets"));
require("./globals");
// change the current directory to where we can create the log/host/electron-*.log files
// this is to workaround a problem when the homedir contains characters that can
// interfere with regexes. NPM package file-stream-rotator has a bug to use the filename
// as a regex.
if (__WIN32__) {
    process.chdir(path.join(os_1.default.homedir(), 'AppData', 'Local', 'Docker'));
}
if (__LINUX__) {
    process.chdir(path.join(os_1.default.homedir(), '.docker', 'desktop'));
}
if (__DARWIN__) {
    // Unix domain socket paths sent to the kernel in `bind` have a maximum length
    // of 104 characters on Darwin. We work around this by using relative paths
    // from here:
    process.chdir(path.join(os_1.default.homedir(), 'Library', 'Containers', 'com.docker.docker', 'Data'));
}
const logFilePath = path.join('log', 'host', 'electron-%DATE%.log');
function initLogger() {
    try {
        const { combine, colorize, timestamp, align, printf } = winston_1.format;
        const fileLogger = new winston_daily_rotate_file_1.default({
            filename: logFilePath,
            handleExceptions: false,
            datePattern: 'YYYY-MM-DD-HH',
            maxSize: '20m',
            maxFiles: '14d',
            format: combine(timestamp(), align(), printf((info) => `${info.timestamp} ${info.level} ${info.message}`)),
        });
        // The file logger receives errors when it can't write to an existing file/attempt to create a file
        // for example due to permissions or the disk being full. If logging fails, that shouldn't crash the application
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        fileLogger.on('error', () => { });
        const winstonLogger = (0, winston_1.createLogger)({
            transports: [fileLogger],
        });
        if (!electron_1.app.isPackaged) {
            winstonLogger.add(new winston_1.transports.Console({
                format: combine(colorize(), timestamp(), align(), printf((info) => `${info.timestamp} ${info.level} ${info.message}`)),
            }));
        }
        // https://github.com/winstonjs/winston/issues/1427#issuecomment-663302238. Workaround to make Winston 3 follow standard log format (like Winston 2)
        // eslint-disable-next-line no-inner-declarations
        function createLogFunc(logLevel) {
            // eslint-disable-next-line consistent-return
            return async (msgFormat, ...args) => {
                // don't redact info in local dev to for debugging purpose
                let redactedArgs = args;
                if (electron_1.app.isPackaged) {
                    try {
                        redactedArgs = args.map((0, redact_secrets_1.default)('<REDACTED>').map);
                        // eslint-disable-next-line no-empty
                    }
                    catch {
                        // happens when logger receive a weird form of objects to log
                    }
                }
                try {
                    return new Promise((resolve, reject) => {
                        winstonLogger[logLevel](util.format(msgFormat, ...redactedArgs), (error) => {
                            if (error) {
                                reject(error);
                            }
                            else {
                                resolve();
                            }
                        });
                    });
                    // eslint-disable-next-line no-empty
                }
                catch { }
            };
        }
        const logger = {
            debug: createLogFunc('debug'),
            verbose: createLogFunc('verbose'),
            info: createLogFunc('info'),
            warn: createLogFunc('warn'),
            error: createLogFunc('error'),
        };
        global.log = logger;
    }
    catch (error) {
        fs_1.default.promises
            .writeFile(logFilePath, `Error initialzing logger ${error}`, {
            encoding: 'utf8',
        })
            .catch(() => {
            // avoid unhandledRejection
        });
        const logger = {
            debug: console.log,
            verbose: console.log,
            info: console.log,
            warn: console.log,
            error: console.log,
        };
        console.error('Error initialzing logger', error);
        global.log = logger;
    }
}
initLogger();

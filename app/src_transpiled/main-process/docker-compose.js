"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeAction = void 0;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const docker_compose_1 = require("../service/docker-compose");
const convertLabelsToCliOptions = (labels) => {
    log.info('labels = ', labels);
    const args = [];
    if (labels[docker_compose_1.LABEL_ENVIRONMENT_FILE]) {
        args.push('--env-file');
        args.push(`"${labels[docker_compose_1.LABEL_ENVIRONMENT_FILE]}"`);
    }
    if (labels[docker_compose_1.LABEL_CONFIG_FILE]) {
        labels[docker_compose_1.LABEL_CONFIG_FILE].split(',').forEach((file) => {
            const filename = path_1.default.parse(file).base;
            args.push('--file');
            args.push(`"${filename}"`);
        });
    }
    if (labels[docker_compose_1.LABEL_PROJECT_NAME]) {
        args.push('--project-name');
        args.push(`"${labels[docker_compose_1.LABEL_PROJECT_NAME]}"`);
    }
    if (labels[docker_compose_1.LABEL_WORKING_DIR]) {
        args.push('--project-directory');
        args.push(`"${labels[docker_compose_1.LABEL_WORKING_DIR]}"`);
    }
    return args.join(' ');
};
const maybeWslExec = (command, labels, onComplete) => {
    const composeCommand = (0, docker_compose_1.getComposeCommandForWindows)(labels, command);
    if (composeCommand.wslDistro) {
        (0, child_process_1.exec)(composeCommand.execCommand, {}, onComplete);
    }
    else {
        (0, child_process_1.exec)(command, {
            cwd: composeCommand.cwd,
        }, onComplete);
    }
};
const getCommand = (labels) => {
    if (labels[docker_compose_1.LABEL_DOCKER_COMPOSE_VERSION]?.startsWith('2.')) {
        return 'docker compose';
    }
    return 'docker-compose-v1';
};
const start = (labels) => new Promise((resolve, reject) => {
    maybeWslExec(`${getCommand(labels)} ${convertLabelsToCliOptions(labels)} up -d`, labels, composeCallback(resolve, reject));
});
const stop = (labels) => new Promise((resolve, reject) => {
    maybeWslExec(`${getCommand(labels)} ${convertLabelsToCliOptions(labels)} stop`, labels, composeCallback(resolve, reject));
});
const remove = (labels) => new Promise((resolve, reject) => {
    maybeWslExec(`${getCommand(labels)} ${convertLabelsToCliOptions(labels)} down`, labels, composeCallback(resolve, reject));
});
const composeCallback = (resolve, reject) => (error, stdout, stderr) => {
    log.info(`stdout: ${stdout}`);
    log.error(`stderr: ${stderr}`);
    if (error) {
        log.error(`error: ${error}`);
        return reject(error);
    }
    return resolve();
};
const actions = {
    start,
    stop,
    remove,
};
const composeAction = (actionName, labels) => actions[actionName](labels);
exports.composeAction = composeAction;

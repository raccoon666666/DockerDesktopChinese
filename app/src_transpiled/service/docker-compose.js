"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComposeCommandForWindows = exports.LABEL_DOCKER_COMPOSE_VERSION = exports.LABEL_WSL_DISTRO = exports.LABEL_CONFIG_FILE = exports.LABEL_ENVIRONMENT_FILE = exports.LABEL_WORKING_DIR = exports.LABEL_PROJECT_NAME = void 0;
exports.LABEL_PROJECT_NAME = 'com.docker.compose.project';
exports.LABEL_WORKING_DIR = 'com.docker.compose.project.working_dir';
exports.LABEL_ENVIRONMENT_FILE = 'com.docker.compose.project.environment_file';
exports.LABEL_CONFIG_FILE = 'com.docker.compose.project.config_files';
exports.LABEL_WSL_DISTRO = 'desktop.docker.io/wsl-distro';
exports.LABEL_DOCKER_COMPOSE_VERSION = 'com.docker.compose.version';
function getComposeCommandForWindows(labels, command) {
    const workingDirectory = labels[exports.LABEL_WORKING_DIR];
    const wslDistro = labels[exports.LABEL_WSL_DISTRO];
    log.info('labels:', labels);
    if (wslDistro) {
        return {
            wslDistro: true,
            execCommand: `wsl -d ${wslDistro} -e sh -c "cd \\"${workingDirectory}\\"; ${command.replace(/"/g, '\\"')}"`,
            spawnCommand: {
                executable: 'wsl',
                args: [
                    '-d',
                    wslDistro,
                    '-e',
                    'sh',
                    '-c',
                    `cd ${workingDirectory}; ${command.replace(/"/g, '\\"')}`,
                ],
            },
        };
    }
    return {
        wslDistro: false,
        cwd: workingDirectory,
    };
}
exports.getComposeCommandForWindows = getComposeCommandForWindows;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.open = void 0;
const child_process_1 = require("child_process");
const electron_1 = require("electron");
const openTerminal = (command) => {
    (0, child_process_1.spawn)('osascript', [
        '-e',
        'tell application "Terminal" to activate',
        '-e',
        `tell application "Terminal"
        do script "${command.replace(/"/g, '\\"')}"
      end tell`,
    ], { detached: true });
};
const tryToExecCommandIterm = (command) => (0, child_process_1.spawn)('osascript', [
    '-e',
    `tell application "iTerm"
        tell current window
          create tab with default profile
          tell current session
            write text "${command.replace(/"/g, '\\"')}"
          end tell
        end tell
      end tell`,
], { detached: true });
const tryToOpenAndExecCommandIterm = (command) => (0, child_process_1.spawn)('osascript', [
    '-e',
    `tell application "iTerm"
        reopen
        tell current window
          tell current session
            write text "${command.replace(/"/g, '\\"')}"
          end tell
        end tell
      end tell`,
], { detached: true });
const openItermWithFallbackToTerminal = (command) => {
    const execCommandIterm = tryToExecCommandIterm(command);
    let error = '';
    execCommandIterm.stderr.on('data', (data) => {
        log.info(`open iTerm stderr: ${data}`);
        error += data.toString();
    });
    execCommandIterm.on('close', (execCode) => {
        if (execCode === 1) {
            if (error.includes(`Can’t get current window.`)) {
                log.info('iTerm is active but no iTerm Window opens');
                const openAndExecCommandIterm = tryToOpenAndExecCommandIterm(command);
                openAndExecCommandIterm.on('close', (openAndExecCode) => {
                    if (openAndExecCode === 1) {
                        log.info('Unknown error when opening iTerm');
                        openTerminal(command);
                    }
                });
            }
            else {
                log.info('Unknown error when executing command in iTerm');
                openTerminal(command);
            }
        }
    });
};
const openOnMac = (command) => {
    const checkItermInstalled = (0, child_process_1.spawn)('osascript', ['-e', 'tell application "iTerm" to activate'], {
        detached: true,
    });
    checkItermInstalled.on('close', (checkItermInstalledCode) => {
        if (checkItermInstalledCode === 0) {
            log.info('try to open in iTerm');
            openItermWithFallbackToTerminal(command);
        }
        else {
            log.info('open in Terminal');
            openTerminal(command);
        }
    });
};
const openOnWindows = (command) => (0, child_process_1.spawn)('cmd.exe', ['/c', command], { detached: true });
const openOnLinux = (command) => {
    const terminal = (0, child_process_1.spawn)('gnome-terminal', ['--', ...command.split(' ')], {
        detached: true,
    });
    terminal.on('error', (err) => {
        log.error('error spawning gnome-terminal:', err);
        electron_1.dialog.showMessageBox({
            title: 'Docker Desktop',
            type: 'warning',
            buttons: ['OK'],
            message: 'gnome-terminal not found',
        });
    });
};
const open = (command) => {
    if (__WIN32__) {
        return openOnWindows(command);
    }
    if (__LINUX__) {
        return openOnLinux(command);
    }
    return openOnMac(command);
};
exports.open = open;

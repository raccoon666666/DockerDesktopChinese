"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEngineAPIIpcHandlers = void 0;
const electron_1 = require("electron");
const dockerode_1 = __importDefault(require("dockerode"));
const StreamBuffer_1 = require("../service/stream-buffer/StreamBuffer");
const backendSocket_1 = require("../service/backendSocket");
const credstore_1 = require("./credstore");
Object.keys(process.env).forEach((env) => {
    if (env.startsWith('DOCKER_')) {
        delete process.env[env];
    }
});
function registerEngineAPIIpcHandlers() {
    const dockerApiClient = new dockerode_1.default({
        socketPath: (0, backendSocket_1.getDockerSocketByPlatform)(),
        // @ts-expect-error
        headers: { 'User-Agent': 'DockerDesktopUI' },
    });
    electron_1.ipcMain.handle('docker-df', () => {
        log.info('received: docker-df');
        return dockerApiClient.df();
    });
    electron_1.ipcMain.handle('docker-list-containers', (_, options) => {
        log.info('received: docker-list-containers');
        return dockerApiClient.listContainers(options);
    });
    electron_1.ipcMain.handle('docker-list-images', (_, options) => {
        log.info('received: docker-list-images');
        return dockerApiClient.listImages(options);
    });
    electron_1.ipcMain.handle('docker-inspect-container', async (_, id) => {
        const container = dockerApiClient.getContainer(id);
        const inspect = await container.inspect();
        return inspect;
    });
    electron_1.ipcMain.handle('docker-start-container', async (_, id) => {
        return dockerApiClient.getContainer(id).start();
    });
    electron_1.ipcMain.handle('docker-pause-container', async (_, id) => {
        return dockerApiClient.getContainer(id).pause();
    });
    electron_1.ipcMain.handle('docker-unpause-container', async (_, id) => {
        return dockerApiClient.getContainer(id).unpause();
    });
    electron_1.ipcMain.handle('docker-stop-container', async (_, id) => {
        return dockerApiClient.getContainer(id).stop();
    });
    electron_1.ipcMain.handle('docker-restart-container', async (_, id) => {
        return dockerApiClient.getContainer(id).restart();
    });
    electron_1.ipcMain.handle('docker-create-container', async (_, options) => {
        log.info(`received: docker-create-container, options:${JSON.stringify(options)}`);
        const container = await dockerApiClient.createContainer(options);
        return container.id;
    });
    electron_1.ipcMain.handle('docker-remove-container', async (_, id) => {
        const container = dockerApiClient.getContainer(id);
        await container.remove({ force: true, v: true });
    });
    electron_1.ipcMain.handle('docker-run-container', async (_, ...options) => {
        log.info(`received: docker-run-container, options:${JSON.stringify(options)}`);
        // @ts-expect-error
        await dockerApiClient.run(...options);
    });
    // @ts-expect-error
    function getImage(image) {
        if (image.tag === '<none>') {
            return dockerApiClient.getImage(image.id);
        }
        return dockerApiClient.getImage(`${image.name}:${image.tag}`);
    }
    electron_1.ipcMain.handle('docker-remove-image', (_, image) => {
        const imageObj = getImage(image);
        return imageObj.remove();
    });
    electron_1.ipcMain.handle('docker-inspect-image', async (_, id) => {
        const imageObj = dockerApiClient.getImage(id);
        const imageInspect = await imageObj.inspect();
        return imageInspect;
    });
    electron_1.ipcMain.handle('docker-get-image-layers', async (_, id) => {
        const imageObj = await dockerApiClient.getImage(id);
        const layers = await imageObj.history();
        return layers;
    });
    // @ts-expect-error
    function handlePushStream(event, image) {
        return (error, stream) => {
            if (error) {
                event.reply('docker-push-image-reply', {
                    type: 'PUSHING_ERRORED',
                    error,
                    image,
                });
                return;
            }
            const layers = [];
            const pushedLayers = [];
            event.reply('docker-push-image-reply', {
                type: 'PUSHING_IN_PROGRESS',
                progression: 0,
                image,
            });
            stream.setEncoding('utf8');
            const buffer = new StreamBuffer_1.StreamBuffer(`push-buffer-${image.Id}`);
            stream.on('data', (data) => {
                const events = buffer.onData(data);
                events.forEach((ev) => {
                    const parsedEvent = JSON.parse(ev);
                    if (parsedEvent.status === 'Preparing') {
                        layers.push(parsedEvent.id);
                    }
                    if (parsedEvent.status === 'Pushed' ||
                        parsedEvent.status === 'Layer already exists') {
                        pushedLayers.push(parsedEvent.id);
                        event.reply('docker-push-image-reply', {
                            type: 'PUSHING_IN_PROGRESS',
                            progression: 
                            // @ts-expect-error
                            (pushedLayers.length / layers.length).toFixed(2) * 100,
                            image,
                        });
                    }
                    if (parsedEvent.status && parsedEvent.status.includes('digest')) {
                        event.reply('docker-push-image-reply', {
                            type: 'PUSHING_FINISHED',
                            description: parsedEvent.status,
                            image,
                        });
                    }
                    if (parsedEvent.errorDetail) {
                        event.reply('docker-push-image-reply', {
                            type: 'PUSHING_ERRORED',
                            error: new Error(parsedEvent.errorDetail.message),
                            image,
                        });
                    }
                });
            });
        };
    }
    electron_1.ipcMain.on('docker-push-image', (event, image) => {
        (0, credstore_1.withCredStore)((error, auth) => {
            if (error) {
                event.reply('docker-push-image-reply', {
                    type: 'PUSHING_ERRORED',
                    error,
                    image,
                });
                return;
            }
            const imageObj = getImage(image);
            imageObj.push({ tag: image.tag, authconfig: auth }, 
            // @ts-expect-error
            handlePushStream(event, image));
        });
    });
    function handlePullStream(event, repoTag, options) {
        return (error, stream) => {
            if (error) {
                event.reply('docker-pull-image-reply', {
                    type: 'PULLING_ERRORED',
                    error,
                    repoTag,
                    options,
                });
                return;
            }
            const layers = {};
            event.reply('docker-pull-image-reply', {
                type: 'PULLING_IN_PROGRESS',
                progression: 0,
                repoTag,
                options,
            });
            stream.setEncoding('utf8');
            const buffer = new StreamBuffer_1.StreamBuffer(`pull-buffer-${repoTag}`);
            stream.on('data', (data) => {
                const events = buffer.onData(data);
                events.forEach((ev) => {
                    const parsedEvent = JSON.parse(ev);
                    const possibleError = parsedEvent.error ?? parsedEvent.errorDetail?.message;
                    if (possibleError) {
                        event.reply('docker-pull-image-reply', {
                            type: 'PULLING_ERRORED',
                            error: new Error(possibleError),
                            repoTag,
                            options,
                        });
                        return;
                    }
                    if (parsedEvent.status === 'Pulling fs layer') {
                        layers[parsedEvent.id] = 0;
                    }
                    if (parsedEvent.status === 'Downloading') {
                        const { progressDetail: { current, total }, id, } = parsedEvent;
                        layers[id] = (current / (total * Object.keys(layers).length)) * 100;
                        event.reply('docker-pull-image-reply', {
                            type: 'PULLING_IN_PROGRESS',
                            progression: Object.keys(layers).reduce((p, layerId) => p + layers[layerId], 0),
                            repoTag,
                            options,
                        });
                    }
                    if (parsedEvent.status.includes('Image is up to date')) {
                        event.reply('docker-pull-image-reply', {
                            type: 'PULLING_FINISHED',
                            description: parsedEvent.status,
                            repoTag,
                            options,
                        });
                    }
                    if (parsedEvent.status.includes('Downloaded newer image')) {
                        event.reply('docker-pull-image-reply', {
                            type: 'DOWNLOADED_NEWER_IMAGE',
                            description: parsedEvent.status,
                            repoTag,
                            options,
                        });
                    }
                });
            });
            stream.on('end', () => {
                stream.destroy();
            });
        };
    }
    electron_1.ipcMain.on('docker-pull-image', (event, repoTag, options) => {
        dockerApiClient.pull(repoTag, (err, stream) => {
            if (err) {
                if (err.message.includes('access denied')) {
                    (0, credstore_1.withCredStore)((error, auth) => {
                        if (error) {
                            event.reply('docker-pull-image-reply', {
                                type: 'PULLING_ERRORED',
                                error: err,
                                repoTag,
                                options,
                            });
                            return;
                        }
                        dockerApiClient.pull(repoTag, { authconfig: auth }, handlePullStream(event, repoTag, options));
                    });
                    return;
                }
            }
            handlePullStream(event, repoTag, options)(err, stream);
        });
    });
    electron_1.ipcMain.handle('docker-inspect-volume', async (_, volumeName) => {
        const volume = await dockerApiClient.getVolume(volumeName);
        const volumeInspect = await volume.inspect();
        return volumeInspect;
    });
    electron_1.ipcMain.handle('docker-remove-volume', (_, volumeName) => {
        const volume = dockerApiClient.getVolume(volumeName);
        return volume.remove();
    });
    electron_1.ipcMain.handle('docker-create-volume', async (_, volumeName) => {
        await dockerApiClient.createVolume({
            name: volumeName,
        });
    });
    electron_1.ipcMain.handle('docker-list-volumes', async () => {
        const { Volumes } = await dockerApiClient.listVolumes();
        return Volumes;
    });
}
exports.registerEngineAPIIpcHandlers = registerEngineAPIIpcHandlers;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDebugTools = void 0;
const electron_1 = require("electron");
function setupDebugTools() {
    if (!electron_1.app.isPackaged) {
        // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
        require('electron-debug')({
            devToolsMode: 'detach',
        });
        const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS,
        // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires, import/no-extraneous-dependencies
         } = require('electron-devtools-installer');
        [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach((extension) => {
            installExtension(extension)
                .then((name) => console.log(`Added Extension: ${name}`))
                .catch((err) => console.log('An error occurred: ', err));
        });
    }
    else {
        // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
        const sourceMapSupport = require('source-map-support');
        sourceMapSupport.install();
    }
}
exports.setupDebugTools = setupDebugTools;

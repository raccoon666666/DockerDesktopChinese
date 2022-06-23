"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDockerConItem = void 0;
const electron_1 = require("electron");
function buildDockerConItem(dockerid) {
    let dockerIdParameter = '';
    if (dockerid) {
        dockerIdParameter = `&dockerid=${dockerid}`;
    }
    return {
        label: 'DockerCon 2022',
        async click() {
            electron_1.shell.openExternal(`https://www.docker.com/dockercon/?utm_campaign=2022-05-10-dockercon&utm_medium=in-product-ad&utm_source=desktop_v4${dockerIdParameter}`);
        },
    };
}
exports.buildDockerConItem = buildDockerConItem;

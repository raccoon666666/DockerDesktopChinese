"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScanSummaryByTag = exports.getRepositoryEnablement = exports.getImageTags = exports.getRemoteRepositories = exports.getOrganizations = void 0;
const electron_fetch_1 = __importDefault(require("electron-fetch"));
const retry_1 = require("./retry");
const HUB_URL = 'https://hub.docker.com';
function get(urlToFetch, hubToken) {
    log.info(`==> GET ${urlToFetch}`);
    const e2eTests = process.env.NODE_ENV === 'test';
    return (0, retry_1.retry)(async () => {
        try {
            const res = await (0, electron_fetch_1.default)(urlToFetch, {
                timeout: 60000,
                headers: {
                    Authorization: `Bearer ${hubToken}`,
                },
            });
            if (res.ok) {
                if (res.status === 204) {
                    return { status: res.status };
                }
                const data = await res.json();
                log.info(`Response for ${urlToFetch}`, data);
                return {
                    status: res.status,
                    data,
                };
            }
            throw new Error(`${res.status} ${res.statusText}`);
        }
        catch (error) {
            log.error(`Error fetching ${urlToFetch}:`, error);
            throw error;
        }
    }, e2eTests ? 5 : 0);
}
function getOrganizations(hubToken) {
    return get(`${HUB_URL}/v2/user/orgs/?page_size=100`, hubToken);
}
exports.getOrganizations = getOrganizations;
function getRemoteRepositories(organization, url, pageSize, hubToken) {
    const urlToFetch = url || `${HUB_URL}/v2/repositories/${organization}?page_size=${pageSize}`;
    return get(urlToFetch, hubToken);
}
exports.getRemoteRepositories = getRemoteRepositories;
function getImageTags(organization, imageName, hubToken) {
    return get(`${HUB_URL}/v2/repositories/${organization}/${imageName}/tags/?page_size=11`, hubToken);
}
exports.getImageTags = getImageTags;
function getRepositoryEnablement(namespace, reponame, hubToken) {
    return get(`${HUB_URL}/api/scan/v1/accounts/${namespace}/${reponame}`, hubToken);
}
exports.getRepositoryEnablement = getRepositoryEnablement;
function getScanSummaryByTag(namespace, reponame, digest, hubToken) {
    return get(`${HUB_URL}/api/scan/v1/reports/snyk/docker.io/${namespace}/${reponame}/${digest}/newest`, hubToken);
}
exports.getScanSummaryByTag = getScanSummaryByTag;

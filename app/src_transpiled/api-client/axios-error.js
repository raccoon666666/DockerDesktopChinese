"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAxiosError = void 0;
// From https://github.com/axios/axios#handling-errors
const handleAxiosError = (error) => {
    if (error.config) {
        log.error(`!!! ${error.config.method} ${error.config.url}`);
    }
    if (error.response) {
        log.error('Error response from server');
        // The request was made and the server responded with a
        // status code that falls out of the range of 2xx
        log.error(error.response.data);
        log.error(error.response.status);
        log.error(error.response.headers);
        // Response from Axios error is not a Javascript Error, thus it will be rejected by Bugsnag
        // So we should decorate err with real error message comming from err.message
        // More info: https://docs.bugsnag.com/platforms/javascript/react/reporting-handled-errors/#sending-custom-errors
        /* eslint-disable no-param-reassign */
        error.message = error.response.statusText;
        if (error.response.data) {
            error.message = JSON.stringify(error.response.data);
        }
        error.status = error.response.status;
        /* eslint-enable no-param-reassign */
    }
    else if (error.request) {
        log.error('Server did not respond to request');
        // The request was made but no response was received, `error.request`
        // is an instance of XMLHttpRequest in the browser and an instance
        // of http.ClientRequest in Node.js
        log.error(error.request);
    }
    else {
        // Something happened in setting up the request and triggered an Error
        log.error('Failed to send request');
        log.error(error.message);
    }
    // error.toJSON() return a JSON object which is an error (has .message and .stack inside it), but still contain {key:value} whose value is Symbol/Function
    let simplifiedError = error.toJSON();
    try {
        simplifiedError = JSON.parse(JSON.stringify(error.toJSON()));
    }
    catch (e) {
        log.error('error simplifying Axios error', e);
    }
    throw simplifiedError;
};
exports.handleAxiosError = handleAxiosError;

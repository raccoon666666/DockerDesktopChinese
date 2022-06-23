"use strict";
process.on('uncaughtException', (error) => {
    log.error('Unhandled uncaught exception :', error);
});
process.on('unhandledRejection', (error) => {
    log.error('Unhandled promise rejection :', error);
});

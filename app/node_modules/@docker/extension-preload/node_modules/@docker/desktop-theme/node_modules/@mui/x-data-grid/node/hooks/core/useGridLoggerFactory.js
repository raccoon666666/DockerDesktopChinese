"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridLoggerFactory = void 0;

var React = _interopRequireWildcard(require("react"));

var _utils = require("../../utils/utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const forceDebug = (0, _utils.localStorageAvailable)() && window.localStorage.getItem('DEBUG') != null;

const noop = () => {};

const noopLogger = {
  debug: noop,
  info: noop,
  warn: noop,
  error: noop
};
const LOG_LEVELS = ['debug', 'info', 'warn', 'error'];

function getAppender(name, logLevel, appender = console) {
  const minLogLevelIdx = LOG_LEVELS.indexOf(logLevel);

  if (minLogLevelIdx === -1) {
    throw new Error(`MUI: Log level ${logLevel} not recognized.`);
  }

  const logger = LOG_LEVELS.reduce((loggerObj, method, idx) => {
    if (idx >= minLogLevelIdx) {
      loggerObj[method] = (...args) => {
        const [message, ...other] = args;
        appender[method](`MUI: ${name} - ${message}`, ...other);
      };
    } else {
      loggerObj[method] = noop;
    }

    return loggerObj;
  }, {});
  return logger;
}

const useGridLoggerFactory = (apiRef, props) => {
  apiRef.current.getLogger = React.useCallback(name => {
    if (forceDebug) {
      return getAppender(name, 'debug', props.logger);
    }

    if (!props.logLevel) {
      return noopLogger;
    }

    return getAppender(name, props.logLevel.toString(), props.logger);
  }, [props.logLevel, props.logger]);
};

exports.useGridLoggerFactory = useGridLoggerFactory;
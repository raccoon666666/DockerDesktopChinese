import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import * as React from 'react';
import { localStorageAvailable } from '../../utils/utils';
var forceDebug = localStorageAvailable() && window.localStorage.getItem('DEBUG') != null;

var noop = function noop() {};

var noopLogger = {
  debug: noop,
  info: noop,
  warn: noop,
  error: noop
};
var LOG_LEVELS = ['debug', 'info', 'warn', 'error'];

function getAppender(name, logLevel) {
  var appender = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : console;
  var minLogLevelIdx = LOG_LEVELS.indexOf(logLevel);

  if (minLogLevelIdx === -1) {
    throw new Error("MUI: Log level ".concat(logLevel, " not recognized."));
  }

  var logger = LOG_LEVELS.reduce(function (loggerObj, method, idx) {
    if (idx >= minLogLevelIdx) {
      loggerObj[method] = function () {
        var _ref;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var message = args[0],
            other = args.slice(1);

        (_ref = appender)[method].apply(_ref, ["MUI: ".concat(name, " - ").concat(message)].concat(_toConsumableArray(other)));
      };
    } else {
      loggerObj[method] = noop;
    }

    return loggerObj;
  }, {});
  return logger;
}

export var useGridLoggerFactory = function useGridLoggerFactory(apiRef, props) {
  apiRef.current.getLogger = React.useCallback(function (name) {
    if (forceDebug) {
      return getAppender(name, 'debug', props.logger);
    }

    if (!props.logLevel) {
      return noopLogger;
    }

    return getAppender(name, props.logLevel.toString(), props.logger);
  }, [props.logLevel, props.logger]);
};
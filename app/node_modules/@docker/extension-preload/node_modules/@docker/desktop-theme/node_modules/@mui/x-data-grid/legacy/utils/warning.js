export var buildWarning = function buildWarning(message) {
  var gravity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'warning';
  var alreadyWarned = false;
  var cleanMessage = Array.isArray(message) ? message.join('\n') : message;
  return function () {
    if (!alreadyWarned) {
      alreadyWarned = true;

      if (gravity === 'error') {
        console.error(cleanMessage);
      } else {
        console.warn(cleanMessage);
      }
    }
  };
};
export var wrapWithWarningOnCall = function wrapWithWarningOnCall(method, message) {
  if (process.env.NODE_ENV === 'production') {
    return method;
  }

  var warning = buildWarning(message);
  return function () {
    warning();
    return method.apply(void 0, arguments);
  };
};
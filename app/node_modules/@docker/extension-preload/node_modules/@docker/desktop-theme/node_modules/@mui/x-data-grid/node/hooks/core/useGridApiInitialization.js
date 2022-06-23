"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridApiInitialization = useGridApiInitialization;

var React = _interopRequireWildcard(require("react"));

var _events = require("../../models/events");

var _useGridApiMethod = require("../utils/useGridApiMethod");

var _useGridApiEventHandler = require("../utils/useGridApiEventHandler");

var _EventManager = require("../../utils/EventManager");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const isSyntheticEvent = event => {
  return event.isPropagationStopped !== undefined;
};

let globalId = 0;

function useGridApiInitialization(inputApiRef, props) {
  const apiRef = React.useRef();

  if (!apiRef.current) {
    apiRef.current = {
      unstable_eventManager: new _EventManager.EventManager(),
      state: {},
      instanceId: globalId
    };
    globalId += 1;
  }

  React.useImperativeHandle(inputApiRef, () => apiRef.current, [apiRef]);
  const publishEvent = React.useCallback((...args) => {
    const [name, params, event = {}] = args;
    event.defaultMuiPrevented = false;

    if (isSyntheticEvent(event) && event.isPropagationStopped()) {
      return;
    }

    const details = props.signature === _useGridApiEventHandler.GridSignature.DataGridPro ? {
      api: apiRef.current
    } : {};
    apiRef.current.unstable_eventManager.emit(name, params, event, details);
  }, [apiRef, props.signature]);
  const subscribeEvent = React.useCallback((event, handler, options) => {
    apiRef.current.unstable_eventManager.on(event, handler, options);
    const api = apiRef.current;
    return () => {
      api.unstable_eventManager.removeListener(event, handler);
    };
  }, [apiRef]);
  const showError = React.useCallback(args => {
    apiRef.current.publishEvent(_events.GridEvents.componentError, args);
  }, [apiRef]);
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, {
    subscribeEvent,
    publishEvent,
    showError
  }, 'GridCoreApi');
  React.useEffect(() => {
    const api = apiRef.current;
    return () => {
      api.publishEvent(_events.GridEvents.unmount);
    };
  }, [apiRef]);
  return apiRef;
}
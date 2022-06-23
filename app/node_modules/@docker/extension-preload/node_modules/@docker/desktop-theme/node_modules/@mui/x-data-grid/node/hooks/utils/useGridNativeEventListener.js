"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridNativeEventListener = void 0;

var React = _interopRequireWildcard(require("react"));

var _events = require("../../models/events");

var _utils = require("../../utils/utils");

var _useGridLogger = require("./useGridLogger");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useGridNativeEventListener = (apiRef, ref, eventName, handler, options) => {
  const logger = (0, _useGridLogger.useGridLogger)(apiRef, 'useNativeEventListener');
  const [added, setAdded] = React.useState(false);
  const handlerRef = React.useRef(handler);
  const wrapHandler = React.useCallback(args => {
    return handlerRef.current && handlerRef.current(args);
  }, []);
  React.useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);
  React.useEffect(() => {
    let targetElement;

    if ((0, _utils.isFunction)(ref)) {
      targetElement = ref();
    } else {
      targetElement = ref && ref.current ? ref.current : null;
    }

    if (targetElement && wrapHandler && eventName && !added) {
      logger.debug(`Binding native ${eventName} event`);
      targetElement.addEventListener(eventName, wrapHandler, options);
      const boundElem = targetElement;
      setAdded(true);

      const unsubscribe = () => {
        logger.debug(`Clearing native ${eventName} event`);
        boundElem.removeEventListener(eventName, wrapHandler, options);
      };

      apiRef.current.subscribeEvent(_events.GridEvents.unmount, unsubscribe);
    }
  }, [ref, wrapHandler, eventName, added, logger, options, apiRef]);
};

exports.useGridNativeEventListener = useGridNativeEventListener;
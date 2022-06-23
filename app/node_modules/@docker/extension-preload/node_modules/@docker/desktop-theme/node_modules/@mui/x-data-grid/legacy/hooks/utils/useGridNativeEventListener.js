import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import { GridEvents } from '../../models/events';
import { isFunction } from '../../utils/utils';
import { useGridLogger } from './useGridLogger';
export var useGridNativeEventListener = function useGridNativeEventListener(apiRef, ref, eventName, handler, options) {
  var logger = useGridLogger(apiRef, 'useNativeEventListener');

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      added = _React$useState2[0],
      setAdded = _React$useState2[1];

  var handlerRef = React.useRef(handler);
  var wrapHandler = React.useCallback(function (args) {
    return handlerRef.current && handlerRef.current(args);
  }, []);
  React.useEffect(function () {
    handlerRef.current = handler;
  }, [handler]);
  React.useEffect(function () {
    var targetElement;

    if (isFunction(ref)) {
      targetElement = ref();
    } else {
      targetElement = ref && ref.current ? ref.current : null;
    }

    if (targetElement && wrapHandler && eventName && !added) {
      logger.debug("Binding native ".concat(eventName, " event"));
      targetElement.addEventListener(eventName, wrapHandler, options);
      var boundElem = targetElement;
      setAdded(true);

      var unsubscribe = function unsubscribe() {
        logger.debug("Clearing native ".concat(eventName, " event"));
        boundElem.removeEventListener(eventName, wrapHandler, options);
      };

      apiRef.current.subscribeEvent(GridEvents.unmount, unsubscribe);
    }
  }, [ref, wrapHandler, eventName, added, logger, options, apiRef]);
};
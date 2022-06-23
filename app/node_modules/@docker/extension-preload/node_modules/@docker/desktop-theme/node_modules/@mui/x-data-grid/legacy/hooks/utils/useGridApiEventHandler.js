import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import * as React from 'react';
import { TimerBasedCleanupTracking } from '../../utils/cleanupTracking/TimerBasedCleanupTracking';
import { FinalizationRegistryBasedCleanupTracking } from '../../utils/cleanupTracking/FinalizationRegistryBasedCleanupTracking';

/**
 * Signal to the underlying logic what version of the public component API
 * of the data grid is exposed.
 */
var GridSignature; // We use class to make it easier to detect in heap snapshots by name

(function (GridSignature) {
  GridSignature["DataGrid"] = "DataGrid";
  GridSignature["DataGridPro"] = "DataGridPro";
})(GridSignature || (GridSignature = {}));

var ObjectToBeRetainedByReact = /*#__PURE__*/_createClass(function ObjectToBeRetainedByReact() {
  _classCallCheck(this, ObjectToBeRetainedByReact);
}); // Based on https://github.com/Bnaya/use-dispose-uncommitted/blob/main/src/finalization-registry-based-impl.ts
// Check https://github.com/facebook/react/issues/15317 to get more information


export function createUseGridApiEventHandler(registry) {
  var cleanupTokensCounter = 0;
  return function useGridApiEventHandler(apiRef, eventName, handler, options) {
    var _React$useState = React.useState(new ObjectToBeRetainedByReact()),
        _React$useState2 = _slicedToArray(_React$useState, 1),
        objectRetainedByReact = _React$useState2[0];

    var subscription = React.useRef(null);
    var handlerRef = React.useRef();
    handlerRef.current = handler;
    var cleanupTokenRef = React.useRef(null);

    if (!subscription.current && handlerRef.current) {
      var enhancedHandler = function enhancedHandler(params, event, details) {
        if (!event.defaultMuiPrevented) {
          var _handlerRef$current;

          (_handlerRef$current = handlerRef.current) == null ? void 0 : _handlerRef$current.call(handlerRef, params, event, details);
        }
      };

      subscription.current = apiRef.current.subscribeEvent(eventName, enhancedHandler, options);
      cleanupTokensCounter += 1;
      cleanupTokenRef.current = {
        cleanupToken: cleanupTokensCounter
      };
      registry.register(objectRetainedByReact, // The callback below will be called once this reference stops being retained
      function () {
        var _subscription$current;

        (_subscription$current = subscription.current) == null ? void 0 : _subscription$current.call(subscription);
        subscription.current = null;
        cleanupTokenRef.current = null;
      }, cleanupTokenRef.current);
    } else if (!handlerRef.current && subscription.current) {
      subscription.current();
      subscription.current = null;

      if (cleanupTokenRef.current) {
        registry.unregister(cleanupTokenRef.current);
        cleanupTokenRef.current = null;
      }
    }

    React.useEffect(function () {
      if (!subscription.current && handlerRef.current) {
        var _enhancedHandler = function _enhancedHandler(params, event, details) {
          if (!event.defaultMuiPrevented) {
            var _handlerRef$current2;

            (_handlerRef$current2 = handlerRef.current) == null ? void 0 : _handlerRef$current2.call(handlerRef, params, event, details);
          }
        };

        subscription.current = apiRef.current.subscribeEvent(eventName, _enhancedHandler, options);
      }

      if (cleanupTokenRef.current && registry) {
        // If the effect was called, it means that this render was committed
        // so we can trust the cleanup function to remove the listener.
        registry.unregister(cleanupTokenRef.current);
        cleanupTokenRef.current = null;
      }

      return function () {
        var _subscription$current2;

        (_subscription$current2 = subscription.current) == null ? void 0 : _subscription$current2.call(subscription);
        subscription.current = null;
      };
    }, [apiRef, eventName, options]);
  };
}
var registry = typeof FinalizationRegistry !== 'undefined' ? new FinalizationRegistryBasedCleanupTracking() : new TimerBasedCleanupTracking(); // eslint-disable-next-line @typescript-eslint/naming-convention

export var unstable_resetCleanupTracking = function unstable_resetCleanupTracking() {
  return registry.reset();
};
export var useGridApiEventHandler = createUseGridApiEventHandler(registry);
var optionsSubscriberOptions = {
  isFirst: true
};
export function useGridApiOptionHandler(apiRef, eventName, handler) {
  // Validate that only one per event name?
  useGridApiEventHandler(apiRef, eventName, handler, optionsSubscriberOptions);
}
export { GridSignature };
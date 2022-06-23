"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridSignature = void 0;
exports.createUseGridApiEventHandler = createUseGridApiEventHandler;
exports.useGridApiEventHandler = exports.unstable_resetCleanupTracking = void 0;
exports.useGridApiOptionHandler = useGridApiOptionHandler;

var React = _interopRequireWildcard(require("react"));

var _TimerBasedCleanupTracking = require("../../utils/cleanupTracking/TimerBasedCleanupTracking");

var _FinalizationRegistryBasedCleanupTracking = require("../../utils/cleanupTracking/FinalizationRegistryBasedCleanupTracking");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Signal to the underlying logic what version of the public component API
 * of the data grid is exposed.
 */
var GridSignature; // We use class to make it easier to detect in heap snapshots by name

exports.GridSignature = GridSignature;

(function (GridSignature) {
  GridSignature["DataGrid"] = "DataGrid";
  GridSignature["DataGridPro"] = "DataGridPro";
})(GridSignature || (exports.GridSignature = GridSignature = {}));

class ObjectToBeRetainedByReact {} // Based on https://github.com/Bnaya/use-dispose-uncommitted/blob/main/src/finalization-registry-based-impl.ts
// Check https://github.com/facebook/react/issues/15317 to get more information


function createUseGridApiEventHandler(registry) {
  let cleanupTokensCounter = 0;
  return function useGridApiEventHandler(apiRef, eventName, handler, options) {
    const [objectRetainedByReact] = React.useState(new ObjectToBeRetainedByReact());
    const subscription = React.useRef(null);
    const handlerRef = React.useRef();
    handlerRef.current = handler;
    const cleanupTokenRef = React.useRef(null);

    if (!subscription.current && handlerRef.current) {
      const enhancedHandler = (params, event, details) => {
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
      () => {
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

    React.useEffect(() => {
      if (!subscription.current && handlerRef.current) {
        const enhancedHandler = (params, event, details) => {
          if (!event.defaultMuiPrevented) {
            var _handlerRef$current2;

            (_handlerRef$current2 = handlerRef.current) == null ? void 0 : _handlerRef$current2.call(handlerRef, params, event, details);
          }
        };

        subscription.current = apiRef.current.subscribeEvent(eventName, enhancedHandler, options);
      }

      if (cleanupTokenRef.current && registry) {
        // If the effect was called, it means that this render was committed
        // so we can trust the cleanup function to remove the listener.
        registry.unregister(cleanupTokenRef.current);
        cleanupTokenRef.current = null;
      }

      return () => {
        var _subscription$current2;

        (_subscription$current2 = subscription.current) == null ? void 0 : _subscription$current2.call(subscription);
        subscription.current = null;
      };
    }, [apiRef, eventName, options]);
  };
}

const registry = typeof FinalizationRegistry !== 'undefined' ? new _FinalizationRegistryBasedCleanupTracking.FinalizationRegistryBasedCleanupTracking() : new _TimerBasedCleanupTracking.TimerBasedCleanupTracking(); // eslint-disable-next-line @typescript-eslint/naming-convention

const unstable_resetCleanupTracking = () => registry.reset();

exports.unstable_resetCleanupTracking = unstable_resetCleanupTracking;
const useGridApiEventHandler = createUseGridApiEventHandler(registry);
exports.useGridApiEventHandler = useGridApiEventHandler;
const optionsSubscriberOptions = {
  isFirst: true
};

function useGridApiOptionHandler(apiRef, eventName, handler) {
  // Validate that only one per event name?
  useGridApiEventHandler(apiRef, eventName, handler, optionsSubscriberOptions);
}
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

class ObjectToBeRetainedByReact {} // Based on https://github.com/Bnaya/use-dispose-uncommitted/blob/main/src/finalization-registry-based-impl.ts
// Check https://github.com/facebook/react/issues/15317 to get more information


export function createUseGridApiEventHandler(registry) {
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
          handlerRef.current?.(params, event, details);
        }
      };

      subscription.current = apiRef.current.subscribeEvent(eventName, enhancedHandler, options);
      cleanupTokensCounter += 1;
      cleanupTokenRef.current = {
        cleanupToken: cleanupTokensCounter
      };
      registry.register(objectRetainedByReact, // The callback below will be called once this reference stops being retained
      () => {
        subscription.current?.();
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
            handlerRef.current?.(params, event, details);
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
        subscription.current?.();
        subscription.current = null;
      };
    }, [apiRef, eventName, options]);
  };
}
const registry = typeof FinalizationRegistry !== 'undefined' ? new FinalizationRegistryBasedCleanupTracking() : new TimerBasedCleanupTracking(); // eslint-disable-next-line @typescript-eslint/naming-convention

export const unstable_resetCleanupTracking = () => registry.reset();
export const useGridApiEventHandler = createUseGridApiEventHandler(registry);
const optionsSubscriberOptions = {
  isFirst: true
};
export function useGridApiOptionHandler(apiRef, eventName, handler) {
  // Validate that only one per event name?
  useGridApiEventHandler(apiRef, eventName, handler, optionsSubscriberOptions);
}
export { GridSignature };
import * as React from 'react';
import { GridEvents } from '../../models/events';
import { isFunction } from '../../utils/utils';
import { useGridLogger } from './useGridLogger';
export const useGridNativeEventListener = (apiRef, ref, eventName, handler, options) => {
  const logger = useGridLogger(apiRef, 'useNativeEventListener');
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

    if (isFunction(ref)) {
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

      apiRef.current.subscribeEvent(GridEvents.unmount, unsubscribe);
    }
  }, [ref, wrapHandler, eventName, added, logger, options, apiRef]);
};
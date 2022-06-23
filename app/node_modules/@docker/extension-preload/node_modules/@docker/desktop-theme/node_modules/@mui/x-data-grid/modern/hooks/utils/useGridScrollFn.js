import * as React from 'react';
import { useGridLogger } from './useGridLogger';
export function useGridScrollFn(apiRef, renderingZoneElementRef, columnHeadersElementRef) {
  const logger = useGridLogger(apiRef, 'useGridScrollFn');
  const previousValue = React.useRef();
  const scrollTo = React.useCallback(v => {
    if (v.left === previousValue.current?.left && v.top === previousValue.current.top) {
      return;
    }

    if (renderingZoneElementRef && renderingZoneElementRef.current) {
      logger.debug(`Moving ${renderingZoneElementRef.current.className} to: ${v.left}-${v.top}`); // Force the creation of a layer, avoid paint when changing the transform value.

      renderingZoneElementRef.current.style.transform = `translate3d(${-v.left}px, ${-v.top}px, 0px)`;
      columnHeadersElementRef.current.style.transform = `translate3d(${-v.left}px, 0px, 0px)`;
      previousValue.current = v;
    }
  }, [renderingZoneElementRef, logger, columnHeadersElementRef]);
  return [scrollTo];
}
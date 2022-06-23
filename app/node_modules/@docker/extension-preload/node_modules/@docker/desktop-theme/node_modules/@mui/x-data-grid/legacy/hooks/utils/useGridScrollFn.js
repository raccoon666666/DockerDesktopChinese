import * as React from 'react';
import { useGridLogger } from './useGridLogger';
export function useGridScrollFn(apiRef, renderingZoneElementRef, columnHeadersElementRef) {
  var logger = useGridLogger(apiRef, 'useGridScrollFn');
  var previousValue = React.useRef();
  var scrollTo = React.useCallback(function (v) {
    var _previousValue$curren;

    if (v.left === ((_previousValue$curren = previousValue.current) == null ? void 0 : _previousValue$curren.left) && v.top === previousValue.current.top) {
      return;
    }

    if (renderingZoneElementRef && renderingZoneElementRef.current) {
      logger.debug("Moving ".concat(renderingZoneElementRef.current.className, " to: ").concat(v.left, "-").concat(v.top)); // Force the creation of a layer, avoid paint when changing the transform value.

      renderingZoneElementRef.current.style.transform = "translate3d(".concat(-v.left, "px, ").concat(-v.top, "px, 0px)");
      columnHeadersElementRef.current.style.transform = "translate3d(".concat(-v.left, "px, 0px, 0px)");
      previousValue.current = v;
    }
  }, [renderingZoneElementRef, logger, columnHeadersElementRef]);
  return [scrollTo];
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridScrollFn = useGridScrollFn;

var React = _interopRequireWildcard(require("react"));

var _useGridLogger = require("./useGridLogger");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function useGridScrollFn(apiRef, renderingZoneElementRef, columnHeadersElementRef) {
  const logger = (0, _useGridLogger.useGridLogger)(apiRef, 'useGridScrollFn');
  const previousValue = React.useRef();
  const scrollTo = React.useCallback(v => {
    var _previousValue$curren;

    if (v.left === ((_previousValue$curren = previousValue.current) == null ? void 0 : _previousValue$curren.left) && v.top === previousValue.current.top) {
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
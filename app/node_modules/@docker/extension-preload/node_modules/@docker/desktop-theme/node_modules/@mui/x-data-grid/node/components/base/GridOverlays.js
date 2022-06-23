"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridOverlays = GridOverlays;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _utils = require("@mui/material/utils");

var _useGridSelector = require("../../hooks/utils/useGridSelector");

var _gridFilterSelector = require("../../hooks/features/filter/gridFilterSelector");

var _gridRowsSelector = require("../../hooks/features/rows/gridRowsSelector");

var _useGridApiContext = require("../../hooks/utils/useGridApiContext");

var _useGridRootProps = require("../../hooks/utils/useGridRootProps");

var _densitySelector = require("../../hooks/features/density/densitySelector");

var _events = require("../../models/events");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function GridOverlayWrapper(props) {
  var _viewportInnerSize$he, _viewportInnerSize$wi;

  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const headerHeight = (0, _useGridSelector.useGridSelector)(apiRef, _densitySelector.gridDensityHeaderHeightSelector);
  const [viewportInnerSize, setViewportInnerSize] = React.useState(() => {
    var _apiRef$current$getRo, _apiRef$current$getRo2;

    return (_apiRef$current$getRo = (_apiRef$current$getRo2 = apiRef.current.getRootDimensions()) == null ? void 0 : _apiRef$current$getRo2.viewportInnerSize) != null ? _apiRef$current$getRo : null;
  });
  const handleViewportSizeChange = React.useCallback(() => {
    var _apiRef$current$getRo3, _apiRef$current$getRo4;

    setViewportInnerSize((_apiRef$current$getRo3 = (_apiRef$current$getRo4 = apiRef.current.getRootDimensions()) == null ? void 0 : _apiRef$current$getRo4.viewportInnerSize) != null ? _apiRef$current$getRo3 : null);
  }, [apiRef]);
  (0, _utils.unstable_useEnhancedEffect)(() => {
    return apiRef.current.subscribeEvent(_events.GridEvents.viewportInnerSizeChange, handleViewportSizeChange);
  }, [apiRef, handleViewportSizeChange]);
  let height = (_viewportInnerSize$he = viewportInnerSize == null ? void 0 : viewportInnerSize.height) != null ? _viewportInnerSize$he : 0;

  if (rootProps.autoHeight && height === 0) {
    height = 'auto';
  }

  if (!viewportInnerSize) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", (0, _extends2.default)({
    style: {
      height,
      width: (_viewportInnerSize$wi = viewportInnerSize == null ? void 0 : viewportInnerSize.width) != null ? _viewportInnerSize$wi : 0,
      position: 'absolute',
      top: headerHeight,
      bottom: height === 'auto' ? 0 : undefined
    }
  }, props));
}

function GridOverlays() {
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const totalRowCount = (0, _useGridSelector.useGridSelector)(apiRef, _gridRowsSelector.gridRowCountSelector);
  const visibleRowCount = (0, _useGridSelector.useGridSelector)(apiRef, _gridFilterSelector.gridVisibleRowCountSelector);
  const showNoRowsOverlay = !rootProps.loading && totalRowCount === 0;
  const showNoResultsOverlay = !rootProps.loading && totalRowCount > 0 && visibleRowCount === 0;
  let overlay = null;

  if (showNoRowsOverlay) {
    var _rootProps$components;

    overlay = /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.NoRowsOverlay, (0, _extends2.default)({}, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.noRowsOverlay));
  }

  if (showNoResultsOverlay) {
    var _rootProps$components2;

    overlay = /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.NoResultsOverlay, (0, _extends2.default)({}, (_rootProps$components2 = rootProps.componentsProps) == null ? void 0 : _rootProps$components2.noResultsOverlay));
  }

  if (rootProps.loading) {
    var _rootProps$components3;

    overlay = /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.LoadingOverlay, (0, _extends2.default)({}, (_rootProps$components3 = rootProps.componentsProps) == null ? void 0 : _rootProps$components3.loadingOverlay));
  }

  if (overlay === null) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(GridOverlayWrapper, {
    children: overlay
  });
}
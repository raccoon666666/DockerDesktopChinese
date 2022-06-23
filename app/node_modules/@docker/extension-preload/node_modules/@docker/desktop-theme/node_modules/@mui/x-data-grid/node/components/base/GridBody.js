"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridBody = GridBody;

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _events = require("../../models/events");

var _useGridApiContext = require("../../hooks/utils/useGridApiContext");

var _GridMainContainer = require("../containers/GridMainContainer");

var _GridAutoSizer = require("../GridAutoSizer");

var _GridOverlays = require("./GridOverlays");

var _useGridRootProps = require("../../hooks/utils/useGridRootProps");

var _useGridSelector = require("../../hooks/utils/useGridSelector");

var _densitySelector = require("../../hooks/features/density/densitySelector");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function GridBody(props) {
  const {
    children,
    VirtualScrollerComponent,
    ColumnHeadersComponent
  } = props;
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const headerHeight = (0, _useGridSelector.useGridSelector)(apiRef, _densitySelector.gridDensityHeaderHeightSelector);
  const [isVirtualizationDisabled, setIsVirtualizationDisabled] = React.useState(rootProps.disableVirtualization);
  const disableVirtualization = React.useCallback(() => {
    setIsVirtualizationDisabled(true);
  }, []);
  const enableVirtualization = React.useCallback(() => {
    setIsVirtualizationDisabled(false);
  }, []); // The `useGridApiMethod` hook can't be used here, because it only installs the
  // method if it doesn't exist yet. Once installed, it's never updated again.
  // This break the methods above, since their closure comes from the first time
  // they were installed. Which means that calling `setIsVirtualizationDisabled`
  // will trigger a re-render, but it won't update the state. That can be solved
  // by migrating the virtualization status to the global state.

  apiRef.current.unstable_disableVirtualization = disableVirtualization;
  apiRef.current.unstable_enableVirtualization = enableVirtualization;
  const columnHeadersRef = React.useRef(null);
  const columnsContainerRef = React.useRef(null);
  const windowRef = React.useRef(null);
  const renderingZoneRef = React.useRef(null);
  apiRef.current.columnHeadersContainerElementRef = columnsContainerRef;
  apiRef.current.columnHeadersElementRef = columnHeadersRef;
  apiRef.current.windowRef = windowRef; // TODO rename, it's not attached to the window anymore

  apiRef.current.renderingZoneRef = renderingZoneRef; // TODO remove, nobody should have access to internal parts of the virtualization

  const handleResize = React.useCallback(size => {
    apiRef.current.publishEvent(_events.GridEvents.resize, size);
  }, [apiRef]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_GridMainContainer.GridMainContainer, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_GridOverlays.GridOverlays, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(ColumnHeadersComponent, {
      ref: columnsContainerRef,
      innerRef: columnHeadersRef
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridAutoSizer.GridAutoSizer, {
      nonce: rootProps.nonce,
      disableHeight: rootProps.autoHeight,
      onResize: handleResize,
      children: size => {
        const style = {
          width: size.width,
          // If `autoHeight` is on, there will be no height value.
          // In this case, let the container to grow whatever it needs.
          height: size.height ? size.height - headerHeight : 'auto',
          marginTop: headerHeight
        };
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(VirtualScrollerComponent, {
          ref: windowRef,
          style: style,
          disableVirtualization: isVirtualizationDisabled
        });
      }
    }), children]
  });
}

process.env.NODE_ENV !== "production" ? GridBody.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  children: _propTypes.default.node,
  ColumnHeadersComponent: _propTypes.default.elementType.isRequired,
  VirtualScrollerComponent: _propTypes.default.elementType.isRequired
} : void 0;
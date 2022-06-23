"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataGridVirtualScroller = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _GridVirtualScroller = require("./virtualization/GridVirtualScroller");

var _GridVirtualScrollerContent = require("./virtualization/GridVirtualScrollerContent");

var _GridVirtualScrollerRenderZone = require("./virtualization/GridVirtualScrollerRenderZone");

var _useGridVirtualScroller = require("../hooks/features/virtualization/useGridVirtualScroller");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["className", "disableVirtualization"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const DataGridVirtualScroller = /*#__PURE__*/React.forwardRef(function DataGridVirtualScroller(props, ref) {
  const {
    className,
    disableVirtualization
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const {
    getRootProps,
    getContentProps,
    getRenderZoneProps,
    getRows
  } = (0, _useGridVirtualScroller.useGridVirtualScroller)({
    ref,
    disableVirtualization
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridVirtualScroller.GridVirtualScroller, (0, _extends2.default)({
    className: className
  }, getRootProps(other), {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridVirtualScrollerContent.GridVirtualScrollerContent, (0, _extends2.default)({}, getContentProps(), {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridVirtualScrollerRenderZone.GridVirtualScrollerRenderZone, (0, _extends2.default)({}, getRenderZoneProps(), {
        children: getRows()
      }))
    }))
  }));
});
exports.DataGridVirtualScroller = DataGridVirtualScroller;
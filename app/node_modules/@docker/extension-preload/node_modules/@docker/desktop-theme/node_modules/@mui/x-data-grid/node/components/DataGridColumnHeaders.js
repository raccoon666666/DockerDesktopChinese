"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataGridColumnHeaders = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _useGridColumnHeaders = require("../hooks/features/columnHeaders/useGridColumnHeaders");

var _GridScrollArea = require("./GridScrollArea");

var _GridColumnHeaders = require("./columnHeaders/GridColumnHeaders");

var _GridColumnHeadersInner = require("./columnHeaders/GridColumnHeadersInner");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["innerRef", "className"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const DataGridColumnHeaders = /*#__PURE__*/React.forwardRef(function GridColumnsHeader(props, ref) {
  const {
    innerRef
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const {
    isDragging,
    getRootProps,
    getInnerProps,
    getColumns
  } = (0, _useGridColumnHeaders.useGridColumnHeaders)({
    innerRef
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_GridColumnHeaders.GridColumnHeaders, (0, _extends2.default)({
    ref: ref
  }, getRootProps(other), {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_GridScrollArea.GridScrollArea, {
      scrollDirection: "left"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridColumnHeadersInner.GridColumnHeadersInner, (0, _extends2.default)({
      isDragging: isDragging
    }, getInnerProps(), {
      children: getColumns()
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridScrollArea.GridScrollArea, {
      scrollDirection: "right"
    })]
  }));
});
exports.DataGridColumnHeaders = DataGridColumnHeaders;
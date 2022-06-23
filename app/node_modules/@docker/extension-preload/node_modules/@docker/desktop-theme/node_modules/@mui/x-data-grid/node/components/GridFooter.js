"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridFooter = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _useGridSelector = require("../hooks/utils/useGridSelector");

var _gridRowsSelector = require("../hooks/features/rows/gridRowsSelector");

var _gridSelectionSelector = require("../hooks/features/selection/gridSelectionSelector");

var _gridFilterSelector = require("../hooks/features/filter/gridFilterSelector");

var _useGridApiContext = require("../hooks/utils/useGridApiContext");

var _GridRowCount = require("./GridRowCount");

var _GridSelectedRowCount = require("./GridSelectedRowCount");

var _GridFooterContainer = require("./containers/GridFooterContainer");

var _useGridRootProps = require("../hooks/utils/useGridRootProps");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const GridFooter = /*#__PURE__*/React.forwardRef(function GridFooter(props, ref) {
  var _rootProps$components;

  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const totalTopLevelRowCount = (0, _useGridSelector.useGridSelector)(apiRef, _gridRowsSelector.gridTopLevelRowCountSelector);
  const selectedRowCount = (0, _useGridSelector.useGridSelector)(apiRef, _gridSelectionSelector.selectedGridRowsCountSelector);
  const visibleTopLevelRowCount = (0, _useGridSelector.useGridSelector)(apiRef, _gridFilterSelector.gridVisibleTopLevelRowCountSelector);
  const selectedRowCountElement = !rootProps.hideFooterSelectedRowCount && selectedRowCount > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridSelectedRowCount.GridSelectedRowCount, {
    selectedRowCount: selectedRowCount
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {});
  const rowCountElement = !rootProps.hideFooterRowCount && !rootProps.pagination ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridRowCount.GridRowCount, {
    rowCount: totalTopLevelRowCount,
    visibleRowCount: visibleTopLevelRowCount
  }) : null;
  const paginationElement = rootProps.pagination && !rootProps.hideFooterPagination && rootProps.components.Pagination && /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.Pagination, (0, _extends2.default)({}, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.pagination));
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_GridFooterContainer.GridFooterContainer, (0, _extends2.default)({
    ref: ref
  }, props, {
    children: [selectedRowCountElement, rowCountElement, paginationElement]
  }));
});
exports.GridFooter = GridFooter;
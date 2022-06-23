"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridToolbar = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _GridToolbarContainer = require("../containers/GridToolbarContainer");

var _GridToolbarColumnsButton = require("./GridToolbarColumnsButton");

var _GridToolbarDensitySelector = require("./GridToolbarDensitySelector");

var _GridToolbarFilterButton = require("./GridToolbarFilterButton");

var _GridToolbarExport = require("./GridToolbarExport");

var _useGridRootProps = require("../../hooks/utils/useGridRootProps");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["className", "csvOptions", "printOptions"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const GridToolbar = /*#__PURE__*/React.forwardRef(function GridToolbar(props, ref) {
  const {
    csvOptions,
    printOptions
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const rootProps = (0, _useGridRootProps.useGridRootProps)();

  if (rootProps.disableColumnFilter && rootProps.disableColumnSelector && rootProps.disableDensitySelector) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_GridToolbarContainer.GridToolbarContainer, (0, _extends2.default)({
    ref: ref
  }, other, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_GridToolbarColumnsButton.GridToolbarColumnsButton, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridToolbarFilterButton.GridToolbarFilterButton, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridToolbarDensitySelector.GridToolbarDensitySelector, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridToolbarExport.GridToolbarExport, {
      csvOptions: csvOptions,
      printOptions: printOptions
    })]
  }));
});
exports.GridToolbar = GridToolbar;
process.env.NODE_ENV !== "production" ? GridToolbar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  csvOptions: _propTypes.default.object,
  printOptions: _propTypes.default.object
} : void 0;
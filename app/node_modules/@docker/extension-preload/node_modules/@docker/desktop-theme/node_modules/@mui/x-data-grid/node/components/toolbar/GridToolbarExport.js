"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridToolbarExport = exports.GridPrintExportMenuItem = exports.GridCsvExportMenuItem = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));

var _useGridApiContext = require("../../hooks/utils/useGridApiContext");

var _GridToolbarExportContainer = require("./GridToolbarExportContainer");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["csvOptions", "printOptions"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const GridCsvExportMenuItem = props => {
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const {
    hideMenu,
    options
  } = props;

  if (options != null && options.disableToolbarButton) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItem.default, {
    onClick: () => {
      apiRef.current.exportDataAsCsv(options);
      hideMenu == null ? void 0 : hideMenu();
    },
    children: apiRef.current.getLocaleText('toolbarExportCSV')
  });
};

exports.GridCsvExportMenuItem = GridCsvExportMenuItem;

const GridPrintExportMenuItem = props => {
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const {
    hideMenu,
    options
  } = props;

  if (options != null && options.disableToolbarButton) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItem.default, {
    onClick: () => {
      apiRef.current.exportDataAsPrint(options);
      hideMenu == null ? void 0 : hideMenu();
    },
    children: apiRef.current.getLocaleText('toolbarExportPrint')
  });
};

exports.GridPrintExportMenuItem = GridPrintExportMenuItem;
const GridToolbarExport = /*#__PURE__*/React.forwardRef(function GridToolbarExport(props, ref) {
  const {
    csvOptions = {},
    printOptions = {}
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);

  if (csvOptions != null && csvOptions.disableToolbarButton && printOptions != null && printOptions.disableToolbarButton) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_GridToolbarExportContainer.GridToolbarExportContainer, (0, _extends2.default)({}, other, {
    ref: ref,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(GridCsvExportMenuItem, {
      options: csvOptions
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(GridPrintExportMenuItem, {
      options: printOptions
    })]
  }));
});
exports.GridToolbarExport = GridToolbarExport;
process.env.NODE_ENV !== "production" ? GridToolbarExport.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  csvOptions: _propTypes.default.object,
  printOptions: _propTypes.default.object
} : void 0;
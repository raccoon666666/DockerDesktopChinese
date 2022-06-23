"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridRowCount = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _material = require("@mui/material");

var _styles = require("@mui/material/styles");

var _useGridApiContext = require("../hooks/utils/useGridApiContext");

var _gridClasses = require("../constants/gridClasses");

var _useGridRootProps = require("../hooks/utils/useGridRootProps");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["className", "rowCount", "visibleRowCount"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['rowCount']
  };
  return (0, _material.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};

const GridRowCountRoot = (0, _styles.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'RowCount',
  overridesResolver: (props, styles) => styles.rowCount
})(({
  theme
}) => ({
  alignItems: 'center',
  display: 'flex',
  margin: theme.spacing(0, 2)
}));
const GridRowCount = /*#__PURE__*/React.forwardRef(function GridRowCount(props, ref) {
  const {
    className,
    rowCount,
    visibleRowCount
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const ownerState = {
    classes: rootProps.classes
  };
  const classes = useUtilityClasses(ownerState);

  if (rowCount === 0) {
    return null;
  }

  const text = visibleRowCount < rowCount ? apiRef.current.getLocaleText('footerTotalVisibleRows')(visibleRowCount, rowCount) : rowCount.toLocaleString();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(GridRowCountRoot, (0, _extends2.default)({
    ref: ref,
    className: (0, _clsx.default)(classes.root, className)
  }, other, {
    children: [apiRef.current.getLocaleText('footerTotalRows'), " ", text]
  }));
});
exports.GridRowCount = GridRowCount;
process.env.NODE_ENV !== "production" ? GridRowCount.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  rowCount: _propTypes.default.number.isRequired,
  visibleRowCount: _propTypes.default.number.isRequired
} : void 0;
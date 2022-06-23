"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridPanelWrapper = GridPanelWrapper;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _Unstable_TrapFocus = _interopRequireDefault(require("@mui/material/Unstable_TrapFocus"));

var _styles = require("@mui/material/styles");

var _material = require("@mui/material");

var _gridClasses = require("../../constants/gridClasses");

var _useGridRootProps = require("../../hooks/utils/useGridRootProps");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["className"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['panelWrapper']
  };
  return (0, _material.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};

const GridPanelWrapperRoot = (0, _styles.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'PanelWrapper',
  overridesResolver: (props, styles) => styles.panelWrapper
})({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  '&:focus': {
    outline: 0
  }
});

const isEnabled = () => true;

function GridPanelWrapper(props) {
  const {
    className
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const ownerState = {
    classes: rootProps.classes
  };
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Unstable_TrapFocus.default, {
    open: true,
    disableEnforceFocus: true,
    isEnabled: isEnabled,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(GridPanelWrapperRoot, (0, _extends2.default)({
      tabIndex: -1,
      className: (0, _clsx.default)(className, classes.root)
    }, other))
  });
}
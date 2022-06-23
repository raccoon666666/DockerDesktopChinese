"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridColumnHeadersInner = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _material = require("@mui/material");

var _styles = require("@mui/material/styles");

var _gridClasses = require("../../constants/gridClasses");

var _useGridRootProps = require("../../hooks/utils/useGridRootProps");

var _useGridApiContext = require("../../hooks/utils/useGridApiContext");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["isDragging", "className"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    isDragging,
    hasScrollX,
    classes
  } = ownerState;
  const slots = {
    root: ['columnHeadersInner', isDragging && 'columnHeaderDropZone', hasScrollX && 'columnHeadersInner--scrollable']
  };
  return (0, _material.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};

const GridColumnHeadersInnerRoot = (0, _styles.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'columnHeadersInner',
  overridesResolver: (props, styles) => [{
    [`&.${_gridClasses.gridClasses.columnHeaderDropZone}`]: styles.columnHeaderDropZone
  }, styles.columnHeadersInner]
})(() => ({
  display: 'flex',
  alignItems: 'center',
  [`&.${_gridClasses.gridClasses.columnHeaderDropZone} .${_gridClasses.gridClasses.columnHeaderDraggableContainer}`]: {
    cursor: 'move'
  },
  [`&.${_gridClasses.gridClasses['columnHeadersInner--scrollable']} .${_gridClasses.gridClasses.columnHeader}:last-child`]: {
    borderRight: 'none'
  }
}));
const GridColumnHeadersInner = /*#__PURE__*/React.forwardRef(function GridColumnHeadersInner(props, ref) {
  var _apiRef$current$getRo, _apiRef$current$getRo2;

  const {
    isDragging,
    className
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const ownerState = {
    isDragging,
    hasScrollX: (_apiRef$current$getRo = (_apiRef$current$getRo2 = apiRef.current.getRootDimensions()) == null ? void 0 : _apiRef$current$getRo2.hasScrollX) != null ? _apiRef$current$getRo : false,
    classes: rootProps.classes
  };
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(GridColumnHeadersInnerRoot, (0, _extends2.default)({
    ref: ref,
    className: (0, _clsx.default)(className, classes.root)
  }, other));
});
exports.GridColumnHeadersInner = GridColumnHeadersInner;
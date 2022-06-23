"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridColumnHeaderSortIcon = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _material = require("@mui/material");

var _Badge = _interopRequireDefault(require("@mui/material/Badge"));

var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));

var _useGridApiContext = require("../../hooks/utils/useGridApiContext");

var _gridClasses = require("../../constants/gridClasses");

var _useGridRootProps = require("../../hooks/utils/useGridRootProps");

var _GridIconButtonContainer = require("./GridIconButtonContainer");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    icon: ['sortIcon']
  };
  return (0, _material.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};

function getIcon(icons, direction, className, sortingOrder) {
  let Icon;
  const iconProps = {};

  if (direction === 'asc') {
    Icon = icons.ColumnSortedAscendingIcon;
  } else if (direction === 'desc') {
    Icon = icons.ColumnSortedDescendingIcon;
  } else {
    Icon = icons.ColumnUnsortedIcon;
    iconProps.sortingOrder = sortingOrder;
  }

  return Icon ? /*#__PURE__*/(0, _jsxRuntime.jsx)(Icon, (0, _extends2.default)({
    fontSize: "small",
    className: className
  }, iconProps)) : null;
}

function GridColumnHeaderSortIconRaw(props) {
  const {
    direction,
    index,
    sortingOrder
  } = props;
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const ownerState = (0, _extends2.default)({}, props, {
    classes: rootProps.classes
  });
  const classes = useUtilityClasses(ownerState);
  const iconElement = getIcon(rootProps.components, direction, classes.icon, sortingOrder);

  if (!iconElement) {
    return null;
  }

  const iconButton = /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton.default, {
    tabIndex: -1,
    "aria-label": apiRef.current.getLocaleText('columnHeaderSortIconLabel'),
    title: apiRef.current.getLocaleText('columnHeaderSortIconLabel'),
    size: "small",
    children: iconElement
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_GridIconButtonContainer.GridIconButtonContainer, {
    children: [index != null && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Badge.default, {
      badgeContent: index,
      color: "default",
      children: iconButton
    }), index == null && iconButton]
  });
}

const GridColumnHeaderSortIcon = /*#__PURE__*/React.memo(GridColumnHeaderSortIconRaw);
exports.GridColumnHeaderSortIcon = GridColumnHeaderSortIcon;
process.env.NODE_ENV !== "production" ? GridColumnHeaderSortIconRaw.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  direction: _propTypes.default.oneOf(['asc', 'desc']),
  index: _propTypes.default.number,
  sortingOrder: _propTypes.default.arrayOf(_propTypes.default.oneOf(['asc', 'desc'])).isRequired
} : void 0;
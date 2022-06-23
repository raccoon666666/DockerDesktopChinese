"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridColumnHeaderSeparatorSides = exports.GridColumnHeaderSeparator = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _material = require("@mui/material");

var _utils = require("@mui/material/utils");

var _gridClasses = require("../../constants/gridClasses");

var _useGridRootProps = require("../../hooks/utils/useGridRootProps");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["resizable", "resizing", "height", "side"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var GridColumnHeaderSeparatorSides;
exports.GridColumnHeaderSeparatorSides = GridColumnHeaderSeparatorSides;

(function (GridColumnHeaderSeparatorSides) {
  GridColumnHeaderSeparatorSides["Left"] = "left";
  GridColumnHeaderSeparatorSides["Right"] = "right";
})(GridColumnHeaderSeparatorSides || (exports.GridColumnHeaderSeparatorSides = GridColumnHeaderSeparatorSides = {}));

const useUtilityClasses = ownerState => {
  const {
    resizable,
    resizing,
    classes,
    side
  } = ownerState;
  const slots = {
    root: ['columnSeparator', resizable && 'columnSeparator--resizable', resizing && 'columnSeparator--resizing', side && `columnSeparator--side${(0, _utils.capitalize)(side)}`],
    icon: ['iconSeparator']
  };
  return (0, _material.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};

function GridColumnHeaderSeparatorRaw(props) {
  const {
    height,
    side = GridColumnHeaderSeparatorSides.Right
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const ownerState = (0, _extends2.default)({}, props, {
    side,
    classes: rootProps.classes
  });
  const classes = useUtilityClasses(ownerState);
  const stopClick = React.useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
  }, []);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    (0, _jsxRuntime.jsx)("div", (0, _extends2.default)({
      className: classes.root,
      style: {
        minHeight: height,
        opacity: rootProps.showColumnRightBorder ? 0 : 1
      }
    }, other, {
      onClick: stopClick,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.ColumnResizeIcon, {
        className: classes.icon
      })
    }))
  );
}

const GridColumnHeaderSeparator = /*#__PURE__*/React.memo(GridColumnHeaderSeparatorRaw);
exports.GridColumnHeaderSeparator = GridColumnHeaderSeparator;
process.env.NODE_ENV !== "production" ? GridColumnHeaderSeparatorRaw.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  height: _propTypes.default.number.isRequired,
  resizable: _propTypes.default.bool.isRequired,
  resizing: _propTypes.default.bool.isRequired,
  side: _propTypes.default.oneOf(['left', 'right'])
} : void 0;
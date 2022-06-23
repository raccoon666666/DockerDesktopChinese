"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnHeaderMenuIcon = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _material = require("@mui/material");

var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));

var _useGridApiContext = require("../../hooks/utils/useGridApiContext");

var _gridClasses = require("../../constants/gridClasses");

var _useGridRootProps = require("../../hooks/utils/useGridRootProps");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes,
    open
  } = ownerState;
  const slots = {
    root: ['menuIcon', open && 'menuOpen'],
    button: ['menuIconButton']
  };
  return (0, _material.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};

const ColumnHeaderMenuIcon = /*#__PURE__*/React.memo(props => {
  const {
    column,
    open,
    columnMenuId,
    columnMenuButtonId,
    iconButtonRef
  } = props;
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const ownerState = (0, _extends2.default)({}, props, {
    classes: rootProps.classes
  });
  const classes = useUtilityClasses(ownerState);
  const handleMenuIconClick = React.useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
    apiRef.current.toggleColumnMenu(column.field);
  }, [apiRef, column.field]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: classes.root,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton.default, {
      ref: iconButtonRef,
      tabIndex: -1,
      className: classes.button,
      "aria-label": apiRef.current.getLocaleText('columnMenuLabel'),
      title: apiRef.current.getLocaleText('columnMenuLabel'),
      size: "small",
      onClick: handleMenuIconClick,
      "aria-expanded": open ? 'true' : undefined,
      "aria-haspopup": "true",
      "aria-controls": columnMenuId,
      id: columnMenuButtonId,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.ColumnMenuIcon, {
        fontSize: "small"
      })
    })
  });
});
exports.ColumnHeaderMenuIcon = ColumnHeaderMenuIcon;
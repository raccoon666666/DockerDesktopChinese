"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridColumnHeaderMenu = GridColumnHeaderMenu;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("@mui/utils");

var _useGridApiContext = require("../../../hooks/utils/useGridApiContext");

var _GridMenu = require("../GridMenu");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function GridColumnHeaderMenu({
  columnMenuId,
  columnMenuButtonId,
  ContentComponent,
  contentComponentProps,
  field,
  open,
  target,
  onExited
}) {
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const currentColumn = apiRef.current.getColumn(field);
  const hideMenu = React.useCallback(event => {
    // Prevent triggering the sorting
    event.stopPropagation();
    apiRef.current.hideColumnMenu();
  }, [apiRef]);

  if (!target) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridMenu.GridMenu, {
    placement: `bottom-${currentColumn.align === 'right' ? 'start' : 'end'}`,
    open: open,
    target: target,
    onClickAway: hideMenu,
    onExited: onExited,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(ContentComponent, (0, _extends2.default)({
      currentColumn: currentColumn,
      hideMenu: hideMenu,
      open: open,
      id: columnMenuId,
      labelledby: columnMenuButtonId
    }, contentComponentProps))
  });
}

process.env.NODE_ENV !== "production" ? GridColumnHeaderMenu.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  columnMenuButtonId: _propTypes.default.string,
  columnMenuId: _propTypes.default.string,
  ContentComponent: _propTypes.default.elementType.isRequired,
  contentComponentProps: _propTypes.default.any,
  field: _propTypes.default.string.isRequired,
  onExited: _propTypes.default.func,
  open: _propTypes.default.bool.isRequired,
  target: _utils.HTMLElementType
} : void 0;
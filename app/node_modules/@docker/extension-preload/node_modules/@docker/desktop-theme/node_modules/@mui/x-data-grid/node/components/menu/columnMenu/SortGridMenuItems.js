"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortGridMenuItems = void 0;

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));

var _useGridSelector = require("../../../hooks/utils/useGridSelector");

var _gridSortingSelector = require("../../../hooks/features/sorting/gridSortingSelector");

var _useGridApiContext = require("../../../hooks/utils/useGridApiContext");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const SortGridMenuItems = props => {
  const {
    column,
    onClick
  } = props;
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const sortModel = (0, _useGridSelector.useGridSelector)(apiRef, _gridSortingSelector.gridSortModelSelector);
  const sortDirection = React.useMemo(() => {
    if (!column) {
      return null;
    }

    const sortItem = sortModel.find(item => item.field === column.field);
    return sortItem == null ? void 0 : sortItem.sort;
  }, [column, sortModel]);
  const onSortMenuItemClick = React.useCallback(event => {
    onClick(event);
    const direction = event.currentTarget.getAttribute('data-value') || null;
    apiRef.current.sortColumn(column, direction);
  }, [apiRef, column, onClick]);

  if (!column || !column.sortable) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItem.default, {
      onClick: onSortMenuItemClick,
      disabled: sortDirection == null,
      children: apiRef.current.getLocaleText('columnMenuUnsort')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItem.default, {
      onClick: onSortMenuItemClick,
      "data-value": "asc",
      disabled: sortDirection === 'asc',
      children: apiRef.current.getLocaleText('columnMenuSortAsc')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItem.default, {
      onClick: onSortMenuItemClick,
      "data-value": "desc",
      disabled: sortDirection === 'desc',
      children: apiRef.current.getLocaleText('columnMenuSortDesc')
    })]
  });
};

exports.SortGridMenuItems = SortGridMenuItems;
process.env.NODE_ENV !== "production" ? SortGridMenuItems.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  column: _propTypes.default.object.isRequired,
  onClick: _propTypes.default.func.isRequired
} : void 0;
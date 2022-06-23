"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridRowGroupableColumnMenuItems = void 0;

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));

var _xDataGrid = require("@mui/x-data-grid");

var _useGridApiContext = require("../hooks/utils/useGridApiContext");

var _gridRowGroupingSelector = require("../hooks/features/rowGrouping/gridRowGroupingSelector");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const GridRowGroupableColumnMenuItems = props => {
  var _columnsLookup$column;

  const {
    column,
    onClick
  } = props;
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rowGroupingModel = (0, _xDataGrid.useGridSelector)(apiRef, _gridRowGroupingSelector.gridRowGroupingSanitizedModelSelector);
  const columnsLookup = (0, _xDataGrid.useGridSelector)(apiRef, _xDataGrid.gridColumnLookupSelector);

  if (!(column != null && column.groupable)) {
    return null;
  }

  const ungroupColumn = event => {
    apiRef.current.removeRowGroupingCriteria(column.field);

    if (onClick) {
      onClick(event);
    }
  };

  const groupColumn = event => {
    apiRef.current.addRowGroupingCriteria(column.field);

    if (onClick) {
      onClick(event);
    }
  };

  const name = (_columnsLookup$column = columnsLookup[column.field].headerName) != null ? _columnsLookup$column : column.field;

  if (rowGroupingModel.includes(column.field)) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItem.default, {
      onClick: ungroupColumn,
      children: apiRef.current.getLocaleText('unGroupColumn')(name)
    });
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItem.default, {
    onClick: groupColumn,
    children: apiRef.current.getLocaleText('groupColumn')(name)
  });
};

exports.GridRowGroupableColumnMenuItems = GridRowGroupableColumnMenuItems;
process.env.NODE_ENV !== "production" ? GridRowGroupableColumnMenuItems.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  column: _propTypes.default.object,
  onClick: _propTypes.default.func
} : void 0;
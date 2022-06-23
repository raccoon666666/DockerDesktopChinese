"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridRowGroupingColumnMenuItems = void 0;

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));

var _xDataGrid = require("@mui/x-data-grid");

var _useGridApiContext = require("../hooks/utils/useGridApiContext");

var _gridRowGroupingSelector = require("../hooks/features/rowGrouping/gridRowGroupingSelector");

var _gridRowGroupingUtils = require("../hooks/features/rowGrouping/gridRowGroupingUtils");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const GridRowGroupingColumnMenuItems = props => {
  const {
    column,
    onClick
  } = props;
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rowGroupingModel = (0, _xDataGrid.useGridSelector)(apiRef, _gridRowGroupingSelector.gridRowGroupingSanitizedModelSelector);
  const columnsLookup = (0, _xDataGrid.useGridSelector)(apiRef, _xDataGrid.gridColumnLookupSelector);

  const renderUnGroupingMenuItem = field => {
    var _columnsLookup$field$;

    const ungroupColumn = event => {
      apiRef.current.removeRowGroupingCriteria(field);

      if (onClick) {
        onClick(event);
      }
    };

    const name = (_columnsLookup$field$ = columnsLookup[field].headerName) != null ? _columnsLookup$field$ : field;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItem.default, {
      onClick: ungroupColumn,
      children: apiRef.current.getLocaleText('unGroupColumn')(name)
    }, field);
  };

  if (!column || !(0, _gridRowGroupingUtils.isGroupingColumn)(column.field)) {
    return null;
  }

  if (column.field === _gridRowGroupingUtils.GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(React.Fragment, {
      children: rowGroupingModel.map(renderUnGroupingMenuItem)
    });
  }

  return renderUnGroupingMenuItem((0, _gridRowGroupingUtils.getRowGroupingCriteriaFromGroupingField)(column.field));
};

exports.GridRowGroupingColumnMenuItems = GridRowGroupingColumnMenuItems;
process.env.NODE_ENV !== "production" ? GridRowGroupingColumnMenuItems.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  column: _propTypes.default.object,
  onClick: _propTypes.default.func
} : void 0;
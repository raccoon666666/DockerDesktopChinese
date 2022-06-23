"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GRID_BOOLEAN_COL_DEF = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _gridStringColDef = require("./gridStringColDef");

var _GridBooleanCell = require("../components/cell/GridBooleanCell");

var _GridEditBooleanCell = require("../components/cell/GridEditBooleanCell");

var _gridSortingUtils = require("../hooks/features/sorting/gridSortingUtils");

var _gridBooleanOperators = require("./gridBooleanOperators");

function gridBooleanFormatter({
  value,
  api
}) {
  return value ? api.getLocaleText('booleanCellTrueLabel') : api.getLocaleText('booleanCellFalseLabel');
}

const GRID_BOOLEAN_COL_DEF = (0, _extends2.default)({}, _gridStringColDef.GRID_STRING_COL_DEF, {
  type: 'boolean',
  align: 'center',
  headerAlign: 'center',
  renderCell: _GridBooleanCell.renderBooleanCell,
  renderEditCell: _GridEditBooleanCell.renderEditBooleanCell,
  sortComparator: _gridSortingUtils.gridNumberComparator,
  valueFormatter: gridBooleanFormatter,
  filterOperators: (0, _gridBooleanOperators.getGridBooleanOperators)()
});
exports.GRID_BOOLEAN_COL_DEF = GRID_BOOLEAN_COL_DEF;
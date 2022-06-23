"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GRID_SINGLE_SELECT_COL_DEF = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _gridStringColDef = require("./gridStringColDef");

var _GridEditSingleSelectCell = require("../components/cell/GridEditSingleSelectCell");

var _gridSingleSelectOperators = require("./gridSingleSelectOperators");

const GRID_SINGLE_SELECT_COL_DEF = (0, _extends2.default)({}, _gridStringColDef.GRID_STRING_COL_DEF, {
  type: 'singleSelect',
  renderEditCell: _GridEditSingleSelectCell.renderEditSingleSelectCell,
  filterOperators: (0, _gridSingleSelectOperators.getGridSingleSelectOperators)()
});
exports.GRID_SINGLE_SELECT_COL_DEF = GRID_SINGLE_SELECT_COL_DEF;
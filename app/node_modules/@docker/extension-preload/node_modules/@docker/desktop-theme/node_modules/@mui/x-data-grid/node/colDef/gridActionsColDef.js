"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GRID_ACTIONS_COL_DEF = exports.GRID_ACTIONS_COLUMN_TYPE = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _gridStringColDef = require("./gridStringColDef");

var _GridActionsCell = require("../components/cell/GridActionsCell");

const GRID_ACTIONS_COLUMN_TYPE = 'actions';
exports.GRID_ACTIONS_COLUMN_TYPE = GRID_ACTIONS_COLUMN_TYPE;
const GRID_ACTIONS_COL_DEF = (0, _extends2.default)({}, _gridStringColDef.GRID_STRING_COL_DEF, {
  sortable: false,
  filterable: false,
  width: 100,
  align: 'center',
  headerAlign: 'center',
  headerName: '',
  disableColumnMenu: true,
  disableExport: true,
  renderCell: _GridActionsCell.renderActionsCell
});
exports.GRID_ACTIONS_COL_DEF = GRID_ACTIONS_COL_DEF;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GRID_TREE_DATA_GROUPING_FIELD = exports.GRID_TREE_DATA_GROUPING_COL_DEF_FORCED_PROPERTIES = exports.GRID_TREE_DATA_GROUPING_COL_DEF = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _xDataGrid = require("@mui/x-data-grid");

/**
 * TODO: Add sorting and filtering on the value and the filteredDescendantCount
 */
const GRID_TREE_DATA_GROUPING_COL_DEF = (0, _extends2.default)({}, _xDataGrid.GRID_STRING_COL_DEF, {
  type: 'treeDataGroup',
  sortable: false,
  filterable: false,
  disableColumnMenu: true,
  disableReorder: true,
  align: 'left',
  width: 200,
  valueGetter: params => params.rowNode.groupingKey
});
exports.GRID_TREE_DATA_GROUPING_COL_DEF = GRID_TREE_DATA_GROUPING_COL_DEF;
const GRID_TREE_DATA_GROUPING_FIELD = '__tree_data_group__';
exports.GRID_TREE_DATA_GROUPING_FIELD = GRID_TREE_DATA_GROUPING_FIELD;
const GRID_TREE_DATA_GROUPING_COL_DEF_FORCED_PROPERTIES = {
  field: GRID_TREE_DATA_GROUPING_FIELD,
  editable: false,
  groupable: false
};
exports.GRID_TREE_DATA_GROUPING_COL_DEF_FORCED_PROPERTIES = GRID_TREE_DATA_GROUPING_COL_DEF_FORCED_PROPERTIES;
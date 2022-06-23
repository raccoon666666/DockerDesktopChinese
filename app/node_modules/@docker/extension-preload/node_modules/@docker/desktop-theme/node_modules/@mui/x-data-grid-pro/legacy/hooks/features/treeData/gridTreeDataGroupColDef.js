import _extends from "@babel/runtime/helpers/esm/extends";
import { GRID_STRING_COL_DEF } from '@mui/x-data-grid';
/**
 * TODO: Add sorting and filtering on the value and the filteredDescendantCount
 */

export var GRID_TREE_DATA_GROUPING_COL_DEF = _extends({}, GRID_STRING_COL_DEF, {
  type: 'treeDataGroup',
  sortable: false,
  filterable: false,
  disableColumnMenu: true,
  disableReorder: true,
  align: 'left',
  width: 200,
  valueGetter: function valueGetter(params) {
    return params.rowNode.groupingKey;
  }
});
export var GRID_TREE_DATA_GROUPING_FIELD = '__tree_data_group__';
export var GRID_TREE_DATA_GROUPING_COL_DEF_FORCED_PROPERTIES = {
  field: GRID_TREE_DATA_GROUPING_FIELD,
  editable: false,
  groupable: false
};
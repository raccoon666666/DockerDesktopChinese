import _extends from "@babel/runtime/helpers/esm/extends";
import { GRID_STRING_COL_DEF } from './gridStringColDef';
import { renderEditSingleSelectCell } from '../components/cell/GridEditSingleSelectCell';
import { getGridSingleSelectOperators } from './gridSingleSelectOperators';
export var GRID_SINGLE_SELECT_COL_DEF = _extends({}, GRID_STRING_COL_DEF, {
  type: 'singleSelect',
  renderEditCell: renderEditSingleSelectCell,
  filterOperators: getGridSingleSelectOperators()
});
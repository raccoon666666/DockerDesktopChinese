import _extends from "@babel/runtime/helpers/esm/extends";
import { GRID_STRING_COL_DEF } from './gridStringColDef';
import { renderBooleanCell } from '../components/cell/GridBooleanCell';
import { renderEditBooleanCell } from '../components/cell/GridEditBooleanCell';
import { gridNumberComparator } from '../hooks/features/sorting/gridSortingUtils';
import { getGridBooleanOperators } from './gridBooleanOperators';

function gridBooleanFormatter({
  value,
  api
}) {
  return value ? api.getLocaleText('booleanCellTrueLabel') : api.getLocaleText('booleanCellFalseLabel');
}

export const GRID_BOOLEAN_COL_DEF = _extends({}, GRID_STRING_COL_DEF, {
  type: 'boolean',
  align: 'center',
  headerAlign: 'center',
  renderCell: renderBooleanCell,
  renderEditCell: renderEditBooleanCell,
  sortComparator: gridNumberComparator,
  valueFormatter: gridBooleanFormatter,
  filterOperators: getGridBooleanOperators()
});
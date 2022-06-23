import _extends from "@babel/runtime/helpers/esm/extends";
import { GRID_STRING_COL_DEF } from './gridStringColDef';
import { renderActionsCell } from '../components/cell/GridActionsCell';
export var GRID_ACTIONS_COLUMN_TYPE = 'actions';
export var GRID_ACTIONS_COL_DEF = _extends({}, GRID_STRING_COL_DEF, {
  sortable: false,
  filterable: false,
  width: 100,
  align: 'center',
  headerAlign: 'center',
  headerName: '',
  disableColumnMenu: true,
  disableExport: true,
  renderCell: renderActionsCell
});
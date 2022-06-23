import _extends from "@babel/runtime/helpers/esm/extends";
import { gridNumberComparator } from '../hooks/features/sorting/gridSortingUtils';
import { isNumber } from '../utils/utils';
import { getGridNumericOperators } from './gridNumericOperators';
import { GRID_STRING_COL_DEF } from './gridStringColDef';
export var GRID_NUMERIC_COL_DEF = _extends({}, GRID_STRING_COL_DEF, {
  type: 'number',
  align: 'right',
  headerAlign: 'right',
  sortComparator: gridNumberComparator,
  valueParser: function valueParser(value) {
    return value === '' ? null : Number(value);
  },
  valueFormatter: function valueFormatter(_ref) {
    var value = _ref.value;
    return value && isNumber(value) && value.toLocaleString() || value;
  },
  filterOperators: getGridNumericOperators()
});
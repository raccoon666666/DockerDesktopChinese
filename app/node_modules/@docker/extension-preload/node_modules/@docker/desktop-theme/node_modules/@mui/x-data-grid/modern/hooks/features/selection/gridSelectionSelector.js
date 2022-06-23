import { createSelector } from '../../../utils/createSelector';
import { gridRowsLookupSelector } from '../rows/gridRowsSelector';
export const gridSelectionStateSelector = state => state.selection;
export const selectedGridRowsCountSelector = createSelector(gridSelectionStateSelector, selection => selection.length);
export const selectedGridRowsSelector = createSelector(gridSelectionStateSelector, gridRowsLookupSelector, (selectedRows, rowsLookup) => new Map(selectedRows.map(id => [id, rowsLookup[id]])));
export const selectedIdsLookupSelector = createSelector(gridSelectionStateSelector, selection => selection.reduce((lookup, rowId) => {
  lookup[rowId] = rowId;
  return lookup;
}, {}));
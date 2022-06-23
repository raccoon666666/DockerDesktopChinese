import { createSelector } from '../../../utils/createSelector';
import { gridRowsLookupSelector } from '../rows/gridRowsSelector';
export var gridSelectionStateSelector = function gridSelectionStateSelector(state) {
  return state.selection;
};
export var selectedGridRowsCountSelector = createSelector(gridSelectionStateSelector, function (selection) {
  return selection.length;
});
export var selectedGridRowsSelector = createSelector(gridSelectionStateSelector, gridRowsLookupSelector, function (selectedRows, rowsLookup) {
  return new Map(selectedRows.map(function (id) {
    return [id, rowsLookup[id]];
  }));
});
export var selectedIdsLookupSelector = createSelector(gridSelectionStateSelector, function (selection) {
  return selection.reduce(function (lookup, rowId) {
    lookup[rowId] = rowId;
    return lookup;
  }, {});
});
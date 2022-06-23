import { createSelector } from '../../../utils/createSelector';
import { gridRowsLookupSelector } from '../rows/gridRowsSelector';
/**
 * @category Sorting
 * @ignore - do not document.
 */

export const gridSortingStateSelector = state => state.sorting;
/**
 * Get the id of the rows after the sorting process.
 * @category Sorting
 */

export const gridSortedRowIdsSelector = createSelector(gridSortingStateSelector, sortingState => sortingState.sortedRows);
/**
 * Get the id and the model of the rows after the sorting process.
 * @category Sorting
 */

export const gridSortedRowEntriesSelector = createSelector(gridSortedRowIdsSelector, gridRowsLookupSelector, (sortedIds, idRowsLookup) => sortedIds.map(id => ({
  id,
  model: idRowsLookup[id]
})));
/**
 * Get the current sorting model.
 * @category Sorting
 */

export const gridSortModelSelector = createSelector(gridSortingStateSelector, sorting => sorting.sortModel);

/**
 * @category Sorting
 * @ignore - do not document.
 */
export const gridSortColumnLookupSelector = createSelector(gridSortModelSelector, sortModel => {
  const result = sortModel.reduce((res, sortItem, index) => {
    res[sortItem.field] = {
      sortDirection: sortItem.sort,
      sortIndex: sortModel.length > 1 ? index + 1 : undefined
    };
    return res;
  }, {});
  return result;
});
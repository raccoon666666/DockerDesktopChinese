import { createSelector } from '../../../utils/createSelector';
import { gridSortedRowEntriesSelector } from '../sorting/gridSortingSelector';
import { gridColumnLookupSelector } from '../columns/gridColumnsSelector';
import { gridRowTreeDepthSelector, gridRowTreeSelector } from '../rows/gridRowsSelector';
/**
 * @category Filtering
 */

export const gridFilterStateSelector = state => state.filter;
/**
 * Get the current filter model.
 * @category Filtering
 */

export const gridFilterModelSelector = createSelector(gridFilterStateSelector, filterState => filterState.filterModel);
/**
 * @category Filtering
 * @ignore - do not document.
 */

export const gridVisibleRowsLookupSelector = createSelector(gridFilterStateSelector, filterState => filterState.visibleRowsLookup);
/**
 * @category Filtering
 * @ignore - do not document.
 */

export const gridFilteredRowsLookupSelector = createSelector(gridFilterStateSelector, filterState => filterState.filteredRowsLookup);
/**
 * @category Filtering
 * @ignore - do not document.
 */

export const gridFilteredDescendantCountLookupSelector = createSelector(gridFilterStateSelector, filterState => filterState.filteredDescendantCountLookup);
/**
 * Get the id and the model of the rows accessible after the filtering process.
 * Does not contain the collapsed children.
 * @category Filtering
 */

export const gridVisibleSortedRowEntriesSelector = createSelector(gridVisibleRowsLookupSelector, gridSortedRowEntriesSelector, (visibleRowsLookup, sortedRows) => sortedRows.filter(row => visibleRowsLookup[row.id] !== false));
/**
 * Get the id of the rows accessible after the filtering process.
 * Does not contain the collapsed children.
 * @category Filtering
 */

export const gridVisibleSortedRowIdsSelector = createSelector(gridVisibleSortedRowEntriesSelector, visibleSortedRowEntries => visibleSortedRowEntries.map(row => row.id));
/**
 * Get the id and the model of the rows accessible after the filtering process.
 * Contains the collapsed children.
 * @category Filtering
 */

export const gridFilteredSortedRowEntriesSelector = createSelector(gridFilteredRowsLookupSelector, gridSortedRowEntriesSelector, (filteredRowsLookup, sortedRows) => sortedRows.filter(row => filteredRowsLookup[row.id] !== false));
/**
 * Get the id of the rows accessible after the filtering process.
 * Contains the collapsed children.
 * @category Filtering
 */

export const gridFilteredSortedRowIdsSelector = createSelector(gridFilteredSortedRowEntriesSelector, filteredSortedRowEntries => filteredSortedRowEntries.map(row => row.id));
/**
 * @category Filtering
 * @deprecated Use `gridVisibleSortedRowIdsSelector` instead
 * @ignore - do not document.
 * TODO: Add deprecation warning once we have the new selectors without the "visible" keyword.
 */

export const gridVisibleRowsSelector = gridVisibleSortedRowIdsSelector;
/**
 * Get the id and the model of the top level rows accessible after the filtering process.
 * @category Filtering
 */

export const gridVisibleSortedTopLevelRowEntriesSelector = createSelector(gridVisibleSortedRowEntriesSelector, gridRowTreeSelector, gridRowTreeDepthSelector, (visibleSortedRows, rowTree, rowTreeDepth) => {
  if (rowTreeDepth < 2) {
    return visibleSortedRows;
  }

  return visibleSortedRows.filter(row => {
    var _rowTree$row$id;

    return ((_rowTree$row$id = rowTree[row.id]) == null ? void 0 : _rowTree$row$id.depth) === 0;
  });
});
/**
 * Get the amount of rows accessible after the filtering process.
 * @category Filtering
 */

export const gridVisibleRowCountSelector = createSelector(gridVisibleSortedRowEntriesSelector, visibleSortedRows => visibleSortedRows.length);
/**
 * Get the amount of top level rows accessible after the filtering process.
 * @category Filtering
 */

export const gridVisibleTopLevelRowCountSelector = createSelector(gridVisibleSortedTopLevelRowEntriesSelector, visibleSortedTopLevelRows => visibleSortedTopLevelRows.length);
/**
 * @category Filtering
 * @ignore - do not document.
 */

export const gridFilterActiveItemsSelector = createSelector(gridFilterModelSelector, gridColumnLookupSelector, (filterModel, columnLookup) => {
  var _filterModel$items;

  return (_filterModel$items = filterModel.items) == null ? void 0 : _filterModel$items.filter(item => {
    var _column$filterOperato, _item$value;

    if (!item.columnField) {
      return false;
    }

    const column = columnLookup[item.columnField];

    if (!(column != null && column.filterOperators) || (column == null ? void 0 : (_column$filterOperato = column.filterOperators) == null ? void 0 : _column$filterOperato.length) === 0) {
      return false;
    }

    const filterOperator = column.filterOperators.find(operator => operator.value === item.operatorValue);

    if (!filterOperator) {
      return false;
    }

    return !filterOperator.InputComponent || item.value != null && ((_item$value = item.value) == null ? void 0 : _item$value.toString()) !== '';
  });
});

/**
 * @category Filtering
 * @ignore - do not document.
 */
export const gridFilterActiveItemsLookupSelector = createSelector(gridFilterActiveItemsSelector, activeFilters => {
  const result = activeFilters.reduce((res, filterItem) => {
    if (!res[filterItem.columnField]) {
      res[filterItem.columnField] = [filterItem];
    } else {
      res[filterItem.columnField].push(filterItem);
    }

    return res;
  }, {});
  return result;
});
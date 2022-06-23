import { createSelector } from '../../../utils/createSelector';
import { gridSortedRowEntriesSelector } from '../sorting/gridSortingSelector';
import { gridColumnLookupSelector } from '../columns/gridColumnsSelector';
import { gridRowTreeDepthSelector, gridRowTreeSelector } from '../rows/gridRowsSelector';
/**
 * @category Filtering
 */

export var gridFilterStateSelector = function gridFilterStateSelector(state) {
  return state.filter;
};
/**
 * Get the current filter model.
 * @category Filtering
 */

export var gridFilterModelSelector = createSelector(gridFilterStateSelector, function (filterState) {
  return filterState.filterModel;
});
/**
 * @category Filtering
 * @ignore - do not document.
 */

export var gridVisibleRowsLookupSelector = createSelector(gridFilterStateSelector, function (filterState) {
  return filterState.visibleRowsLookup;
});
/**
 * @category Filtering
 * @ignore - do not document.
 */

export var gridFilteredRowsLookupSelector = createSelector(gridFilterStateSelector, function (filterState) {
  return filterState.filteredRowsLookup;
});
/**
 * @category Filtering
 * @ignore - do not document.
 */

export var gridFilteredDescendantCountLookupSelector = createSelector(gridFilterStateSelector, function (filterState) {
  return filterState.filteredDescendantCountLookup;
});
/**
 * Get the id and the model of the rows accessible after the filtering process.
 * Does not contain the collapsed children.
 * @category Filtering
 */

export var gridVisibleSortedRowEntriesSelector = createSelector(gridVisibleRowsLookupSelector, gridSortedRowEntriesSelector, function (visibleRowsLookup, sortedRows) {
  return sortedRows.filter(function (row) {
    return visibleRowsLookup[row.id] !== false;
  });
});
/**
 * Get the id of the rows accessible after the filtering process.
 * Does not contain the collapsed children.
 * @category Filtering
 */

export var gridVisibleSortedRowIdsSelector = createSelector(gridVisibleSortedRowEntriesSelector, function (visibleSortedRowEntries) {
  return visibleSortedRowEntries.map(function (row) {
    return row.id;
  });
});
/**
 * Get the id and the model of the rows accessible after the filtering process.
 * Contains the collapsed children.
 * @category Filtering
 */

export var gridFilteredSortedRowEntriesSelector = createSelector(gridFilteredRowsLookupSelector, gridSortedRowEntriesSelector, function (filteredRowsLookup, sortedRows) {
  return sortedRows.filter(function (row) {
    return filteredRowsLookup[row.id] !== false;
  });
});
/**
 * Get the id of the rows accessible after the filtering process.
 * Contains the collapsed children.
 * @category Filtering
 */

export var gridFilteredSortedRowIdsSelector = createSelector(gridFilteredSortedRowEntriesSelector, function (filteredSortedRowEntries) {
  return filteredSortedRowEntries.map(function (row) {
    return row.id;
  });
});
/**
 * @category Filtering
 * @deprecated Use `gridVisibleSortedRowIdsSelector` instead
 * @ignore - do not document.
 * TODO: Add deprecation warning once we have the new selectors without the "visible" keyword.
 */

export var gridVisibleRowsSelector = gridVisibleSortedRowIdsSelector;
/**
 * Get the id and the model of the top level rows accessible after the filtering process.
 * @category Filtering
 */

export var gridVisibleSortedTopLevelRowEntriesSelector = createSelector(gridVisibleSortedRowEntriesSelector, gridRowTreeSelector, gridRowTreeDepthSelector, function (visibleSortedRows, rowTree, rowTreeDepth) {
  if (rowTreeDepth < 2) {
    return visibleSortedRows;
  }

  return visibleSortedRows.filter(function (row) {
    var _rowTree$row$id;

    return ((_rowTree$row$id = rowTree[row.id]) == null ? void 0 : _rowTree$row$id.depth) === 0;
  });
});
/**
 * Get the amount of rows accessible after the filtering process.
 * @category Filtering
 */

export var gridVisibleRowCountSelector = createSelector(gridVisibleSortedRowEntriesSelector, function (visibleSortedRows) {
  return visibleSortedRows.length;
});
/**
 * Get the amount of top level rows accessible after the filtering process.
 * @category Filtering
 */

export var gridVisibleTopLevelRowCountSelector = createSelector(gridVisibleSortedTopLevelRowEntriesSelector, function (visibleSortedTopLevelRows) {
  return visibleSortedTopLevelRows.length;
});
/**
 * @category Filtering
 * @ignore - do not document.
 */

export var gridFilterActiveItemsSelector = createSelector(gridFilterModelSelector, gridColumnLookupSelector, function (filterModel, columnLookup) {
  var _filterModel$items;

  return (_filterModel$items = filterModel.items) == null ? void 0 : _filterModel$items.filter(function (item) {
    var _column$filterOperato, _item$value;

    if (!item.columnField) {
      return false;
    }

    var column = columnLookup[item.columnField];

    if (!(column != null && column.filterOperators) || (column == null ? void 0 : (_column$filterOperato = column.filterOperators) == null ? void 0 : _column$filterOperato.length) === 0) {
      return false;
    }

    var filterOperator = column.filterOperators.find(function (operator) {
      return operator.value === item.operatorValue;
    });

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
export var gridFilterActiveItemsLookupSelector = createSelector(gridFilterActiveItemsSelector, function (activeFilters) {
  var result = activeFilters.reduce(function (res, filterItem) {
    if (!res[filterItem.columnField]) {
      res[filterItem.columnField] = [filterItem];
    } else {
      res[filterItem.columnField].push(filterItem);
    }

    return res;
  }, {});
  return result;
});
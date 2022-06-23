import { createSelector } from '../../../utils/createSelector';
import { gridVisibleSortedRowEntriesSelector, gridVisibleSortedRowIdsSelector, gridVisibleSortedTopLevelRowEntriesSelector } from '../filter/gridFilterSelector';
import { gridRowTreeDepthSelector, gridRowTreeSelector } from '../rows/gridRowsSelector';
/**
 * @category Pagination
 * @ignore - do not document.
 */

export var gridPaginationSelector = function gridPaginationSelector(state) {
  return state.pagination;
};
/**
 * Get the index of the page to render if the pagination is enabled
 * @category Pagination
 */

export var gridPageSelector = createSelector(gridPaginationSelector, function (pagination) {
  return pagination.page;
});
/**
 * Get the maximum amount of rows to display on a single page if the pagination is enabled
 * @category Pagination
 */

export var gridPageSizeSelector = createSelector(gridPaginationSelector, function (pagination) {
  return pagination.pageSize;
});
/**
 * Get the amount of pages needed to display all the rows if the pagination is enabled
 * @category Pagination
 */

export var gridPageCountSelector = createSelector(gridPaginationSelector, function (pagination) {
  return pagination.pageCount;
});
/**
 * Get the index of the first and the last row to include in the current page if the pagination is enabled.
 * @category Pagination
 */

export var gridPaginationRowRangeSelector = createSelector(gridPaginationSelector, gridRowTreeSelector, gridRowTreeDepthSelector, gridVisibleSortedRowEntriesSelector, gridVisibleSortedTopLevelRowEntriesSelector, function (pagination, rowTree, rowTreeDepth, visibleSortedRowEntries, visibleSortedTopLevelRowEntries) {
  var visibleTopLevelRowCount = visibleSortedTopLevelRowEntries.length;
  var topLevelFirstRowIndex = Math.min(pagination.pageSize * pagination.page, visibleTopLevelRowCount - 1);
  var topLevelLastRowIndex = Math.min(topLevelFirstRowIndex + pagination.pageSize - 1, visibleTopLevelRowCount - 1); // The range contains no element

  if (topLevelFirstRowIndex === -1 || topLevelLastRowIndex === -1) {
    return null;
  } // The tree is flat, there is no need to look for children


  if (rowTreeDepth < 2) {
    return {
      firstRowIndex: topLevelFirstRowIndex,
      lastRowIndex: topLevelLastRowIndex
    };
  }

  var topLevelFirstRow = visibleSortedTopLevelRowEntries[topLevelFirstRowIndex];
  var topLevelRowsInCurrentPageCount = topLevelLastRowIndex - topLevelFirstRowIndex + 1;
  var firstRowIndex = visibleSortedRowEntries.findIndex(function (row) {
    return row.id === topLevelFirstRow.id;
  });
  var lastRowIndex = firstRowIndex;
  var topLevelRowAdded = 0;

  while (lastRowIndex < visibleSortedRowEntries.length && topLevelRowAdded <= topLevelRowsInCurrentPageCount) {
    var row = visibleSortedRowEntries[lastRowIndex];
    var depth = rowTree[row.id].depth;

    if (topLevelRowAdded < topLevelRowsInCurrentPageCount || depth > 0) {
      lastRowIndex += 1;
    }

    if (depth === 0) {
      topLevelRowAdded += 1;
    }
  }

  return {
    firstRowIndex: firstRowIndex,
    lastRowIndex: lastRowIndex - 1
  };
});
/**
 * Get the id and the model of each row to include in the current page if the pagination is enabled.
 * @category Pagination
 */

export var gridPaginatedVisibleSortedGridRowEntriesSelector = createSelector(gridVisibleSortedRowEntriesSelector, gridPaginationRowRangeSelector, function (visibleSortedRowEntries, paginationRange) {
  if (!paginationRange) {
    return [];
  }

  return visibleSortedRowEntries.slice(paginationRange.firstRowIndex, paginationRange.lastRowIndex + 1);
});
/**
 * Get the id of each row to include in the current page if the pagination is enabled.
 * @category Pagination
 */

export var gridPaginatedVisibleSortedGridRowIdsSelector = createSelector(gridVisibleSortedRowIdsSelector, gridPaginationRowRangeSelector, function (visibleSortedRowIds, paginationRange) {
  if (!paginationRange) {
    return [];
  }

  return visibleSortedRowIds.slice(paginationRange.firstRowIndex, paginationRange.lastRowIndex + 1);
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridPaginationSelector = exports.gridPaginationRowRangeSelector = exports.gridPaginatedVisibleSortedGridRowIdsSelector = exports.gridPaginatedVisibleSortedGridRowEntriesSelector = exports.gridPageSizeSelector = exports.gridPageSelector = exports.gridPageCountSelector = void 0;

var _createSelector = require("../../../utils/createSelector");

var _gridFilterSelector = require("../filter/gridFilterSelector");

var _gridRowsSelector = require("../rows/gridRowsSelector");

/**
 * @category Pagination
 * @ignore - do not document.
 */
const gridPaginationSelector = state => state.pagination;
/**
 * Get the index of the page to render if the pagination is enabled
 * @category Pagination
 */


exports.gridPaginationSelector = gridPaginationSelector;
const gridPageSelector = (0, _createSelector.createSelector)(gridPaginationSelector, pagination => pagination.page);
/**
 * Get the maximum amount of rows to display on a single page if the pagination is enabled
 * @category Pagination
 */

exports.gridPageSelector = gridPageSelector;
const gridPageSizeSelector = (0, _createSelector.createSelector)(gridPaginationSelector, pagination => pagination.pageSize);
/**
 * Get the amount of pages needed to display all the rows if the pagination is enabled
 * @category Pagination
 */

exports.gridPageSizeSelector = gridPageSizeSelector;
const gridPageCountSelector = (0, _createSelector.createSelector)(gridPaginationSelector, pagination => pagination.pageCount);
/**
 * Get the index of the first and the last row to include in the current page if the pagination is enabled.
 * @category Pagination
 */

exports.gridPageCountSelector = gridPageCountSelector;
const gridPaginationRowRangeSelector = (0, _createSelector.createSelector)(gridPaginationSelector, _gridRowsSelector.gridRowTreeSelector, _gridRowsSelector.gridRowTreeDepthSelector, _gridFilterSelector.gridVisibleSortedRowEntriesSelector, _gridFilterSelector.gridVisibleSortedTopLevelRowEntriesSelector, (pagination, rowTree, rowTreeDepth, visibleSortedRowEntries, visibleSortedTopLevelRowEntries) => {
  const visibleTopLevelRowCount = visibleSortedTopLevelRowEntries.length;
  const topLevelFirstRowIndex = Math.min(pagination.pageSize * pagination.page, visibleTopLevelRowCount - 1);
  const topLevelLastRowIndex = Math.min(topLevelFirstRowIndex + pagination.pageSize - 1, visibleTopLevelRowCount - 1); // The range contains no element

  if (topLevelFirstRowIndex === -1 || topLevelLastRowIndex === -1) {
    return null;
  } // The tree is flat, there is no need to look for children


  if (rowTreeDepth < 2) {
    return {
      firstRowIndex: topLevelFirstRowIndex,
      lastRowIndex: topLevelLastRowIndex
    };
  }

  const topLevelFirstRow = visibleSortedTopLevelRowEntries[topLevelFirstRowIndex];
  const topLevelRowsInCurrentPageCount = topLevelLastRowIndex - topLevelFirstRowIndex + 1;
  const firstRowIndex = visibleSortedRowEntries.findIndex(row => row.id === topLevelFirstRow.id);
  let lastRowIndex = firstRowIndex;
  let topLevelRowAdded = 0;

  while (lastRowIndex < visibleSortedRowEntries.length && topLevelRowAdded <= topLevelRowsInCurrentPageCount) {
    const row = visibleSortedRowEntries[lastRowIndex];
    const depth = rowTree[row.id].depth;

    if (topLevelRowAdded < topLevelRowsInCurrentPageCount || depth > 0) {
      lastRowIndex += 1;
    }

    if (depth === 0) {
      topLevelRowAdded += 1;
    }
  }

  return {
    firstRowIndex,
    lastRowIndex: lastRowIndex - 1
  };
});
/**
 * Get the id and the model of each row to include in the current page if the pagination is enabled.
 * @category Pagination
 */

exports.gridPaginationRowRangeSelector = gridPaginationRowRangeSelector;
const gridPaginatedVisibleSortedGridRowEntriesSelector = (0, _createSelector.createSelector)(_gridFilterSelector.gridVisibleSortedRowEntriesSelector, gridPaginationRowRangeSelector, (visibleSortedRowEntries, paginationRange) => {
  if (!paginationRange) {
    return [];
  }

  return visibleSortedRowEntries.slice(paginationRange.firstRowIndex, paginationRange.lastRowIndex + 1);
});
/**
 * Get the id of each row to include in the current page if the pagination is enabled.
 * @category Pagination
 */

exports.gridPaginatedVisibleSortedGridRowEntriesSelector = gridPaginatedVisibleSortedGridRowEntriesSelector;
const gridPaginatedVisibleSortedGridRowIdsSelector = (0, _createSelector.createSelector)(_gridFilterSelector.gridVisibleSortedRowIdsSelector, gridPaginationRowRangeSelector, (visibleSortedRowIds, paginationRange) => {
  if (!paginationRange) {
    return [];
  }

  return visibleSortedRowIds.slice(paginationRange.firstRowIndex, paginationRange.lastRowIndex + 1);
});
exports.gridPaginatedVisibleSortedGridRowIdsSelector = gridPaginatedVisibleSortedGridRowIdsSelector;
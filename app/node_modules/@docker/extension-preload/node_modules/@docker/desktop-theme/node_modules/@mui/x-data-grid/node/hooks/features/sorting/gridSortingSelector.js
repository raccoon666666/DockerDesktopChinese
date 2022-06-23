"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridSortingStateSelector = exports.gridSortedRowIdsSelector = exports.gridSortedRowEntriesSelector = exports.gridSortModelSelector = exports.gridSortColumnLookupSelector = void 0;

var _createSelector = require("../../../utils/createSelector");

var _gridRowsSelector = require("../rows/gridRowsSelector");

/**
 * @category Sorting
 * @ignore - do not document.
 */
const gridSortingStateSelector = state => state.sorting;
/**
 * Get the id of the rows after the sorting process.
 * @category Sorting
 */


exports.gridSortingStateSelector = gridSortingStateSelector;
const gridSortedRowIdsSelector = (0, _createSelector.createSelector)(gridSortingStateSelector, sortingState => sortingState.sortedRows);
/**
 * Get the id and the model of the rows after the sorting process.
 * @category Sorting
 */

exports.gridSortedRowIdsSelector = gridSortedRowIdsSelector;
const gridSortedRowEntriesSelector = (0, _createSelector.createSelector)(gridSortedRowIdsSelector, _gridRowsSelector.gridRowsLookupSelector, (sortedIds, idRowsLookup) => sortedIds.map(id => ({
  id,
  model: idRowsLookup[id]
})));
/**
 * Get the current sorting model.
 * @category Sorting
 */

exports.gridSortedRowEntriesSelector = gridSortedRowEntriesSelector;
const gridSortModelSelector = (0, _createSelector.createSelector)(gridSortingStateSelector, sorting => sorting.sortModel);
exports.gridSortModelSelector = gridSortModelSelector;

/**
 * @category Sorting
 * @ignore - do not document.
 */
const gridSortColumnLookupSelector = (0, _createSelector.createSelector)(gridSortModelSelector, sortModel => {
  const result = sortModel.reduce((res, sortItem, index) => {
    res[sortItem.field] = {
      sortDirection: sortItem.sort,
      sortIndex: sortModel.length > 1 ? index + 1 : undefined
    };
    return res;
  }, {});
  return result;
});
exports.gridSortColumnLookupSelector = gridSortColumnLookupSelector;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridVisibleTopLevelRowCountSelector = exports.gridVisibleSortedTopLevelRowEntriesSelector = exports.gridVisibleSortedRowIdsSelector = exports.gridVisibleSortedRowEntriesSelector = exports.gridVisibleRowsSelector = exports.gridVisibleRowsLookupSelector = exports.gridVisibleRowCountSelector = exports.gridFilteredSortedRowIdsSelector = exports.gridFilteredSortedRowEntriesSelector = exports.gridFilteredRowsLookupSelector = exports.gridFilteredDescendantCountLookupSelector = exports.gridFilterStateSelector = exports.gridFilterModelSelector = exports.gridFilterActiveItemsSelector = exports.gridFilterActiveItemsLookupSelector = void 0;

var _createSelector = require("../../../utils/createSelector");

var _gridSortingSelector = require("../sorting/gridSortingSelector");

var _gridColumnsSelector = require("../columns/gridColumnsSelector");

var _gridRowsSelector = require("../rows/gridRowsSelector");

/**
 * @category Filtering
 */
const gridFilterStateSelector = state => state.filter;
/**
 * Get the current filter model.
 * @category Filtering
 */


exports.gridFilterStateSelector = gridFilterStateSelector;
const gridFilterModelSelector = (0, _createSelector.createSelector)(gridFilterStateSelector, filterState => filterState.filterModel);
/**
 * @category Filtering
 * @ignore - do not document.
 */

exports.gridFilterModelSelector = gridFilterModelSelector;
const gridVisibleRowsLookupSelector = (0, _createSelector.createSelector)(gridFilterStateSelector, filterState => filterState.visibleRowsLookup);
/**
 * @category Filtering
 * @ignore - do not document.
 */

exports.gridVisibleRowsLookupSelector = gridVisibleRowsLookupSelector;
const gridFilteredRowsLookupSelector = (0, _createSelector.createSelector)(gridFilterStateSelector, filterState => filterState.filteredRowsLookup);
/**
 * @category Filtering
 * @ignore - do not document.
 */

exports.gridFilteredRowsLookupSelector = gridFilteredRowsLookupSelector;
const gridFilteredDescendantCountLookupSelector = (0, _createSelector.createSelector)(gridFilterStateSelector, filterState => filterState.filteredDescendantCountLookup);
/**
 * Get the id and the model of the rows accessible after the filtering process.
 * Does not contain the collapsed children.
 * @category Filtering
 */

exports.gridFilteredDescendantCountLookupSelector = gridFilteredDescendantCountLookupSelector;
const gridVisibleSortedRowEntriesSelector = (0, _createSelector.createSelector)(gridVisibleRowsLookupSelector, _gridSortingSelector.gridSortedRowEntriesSelector, (visibleRowsLookup, sortedRows) => sortedRows.filter(row => visibleRowsLookup[row.id] !== false));
/**
 * Get the id of the rows accessible after the filtering process.
 * Does not contain the collapsed children.
 * @category Filtering
 */

exports.gridVisibleSortedRowEntriesSelector = gridVisibleSortedRowEntriesSelector;
const gridVisibleSortedRowIdsSelector = (0, _createSelector.createSelector)(gridVisibleSortedRowEntriesSelector, visibleSortedRowEntries => visibleSortedRowEntries.map(row => row.id));
/**
 * Get the id and the model of the rows accessible after the filtering process.
 * Contains the collapsed children.
 * @category Filtering
 */

exports.gridVisibleSortedRowIdsSelector = gridVisibleSortedRowIdsSelector;
const gridFilteredSortedRowEntriesSelector = (0, _createSelector.createSelector)(gridFilteredRowsLookupSelector, _gridSortingSelector.gridSortedRowEntriesSelector, (filteredRowsLookup, sortedRows) => sortedRows.filter(row => filteredRowsLookup[row.id] !== false));
/**
 * Get the id of the rows accessible after the filtering process.
 * Contains the collapsed children.
 * @category Filtering
 */

exports.gridFilteredSortedRowEntriesSelector = gridFilteredSortedRowEntriesSelector;
const gridFilteredSortedRowIdsSelector = (0, _createSelector.createSelector)(gridFilteredSortedRowEntriesSelector, filteredSortedRowEntries => filteredSortedRowEntries.map(row => row.id));
/**
 * @category Filtering
 * @deprecated Use `gridVisibleSortedRowIdsSelector` instead
 * @ignore - do not document.
 * TODO: Add deprecation warning once we have the new selectors without the "visible" keyword.
 */

exports.gridFilteredSortedRowIdsSelector = gridFilteredSortedRowIdsSelector;
const gridVisibleRowsSelector = gridVisibleSortedRowIdsSelector;
/**
 * Get the id and the model of the top level rows accessible after the filtering process.
 * @category Filtering
 */

exports.gridVisibleRowsSelector = gridVisibleRowsSelector;
const gridVisibleSortedTopLevelRowEntriesSelector = (0, _createSelector.createSelector)(gridVisibleSortedRowEntriesSelector, _gridRowsSelector.gridRowTreeSelector, _gridRowsSelector.gridRowTreeDepthSelector, (visibleSortedRows, rowTree, rowTreeDepth) => {
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

exports.gridVisibleSortedTopLevelRowEntriesSelector = gridVisibleSortedTopLevelRowEntriesSelector;
const gridVisibleRowCountSelector = (0, _createSelector.createSelector)(gridVisibleSortedRowEntriesSelector, visibleSortedRows => visibleSortedRows.length);
/**
 * Get the amount of top level rows accessible after the filtering process.
 * @category Filtering
 */

exports.gridVisibleRowCountSelector = gridVisibleRowCountSelector;
const gridVisibleTopLevelRowCountSelector = (0, _createSelector.createSelector)(gridVisibleSortedTopLevelRowEntriesSelector, visibleSortedTopLevelRows => visibleSortedTopLevelRows.length);
/**
 * @category Filtering
 * @ignore - do not document.
 */

exports.gridVisibleTopLevelRowCountSelector = gridVisibleTopLevelRowCountSelector;
const gridFilterActiveItemsSelector = (0, _createSelector.createSelector)(gridFilterModelSelector, _gridColumnsSelector.gridColumnLookupSelector, (filterModel, columnLookup) => {
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
exports.gridFilterActiveItemsSelector = gridFilterActiveItemsSelector;

/**
 * @category Filtering
 * @ignore - do not document.
 */
const gridFilterActiveItemsLookupSelector = (0, _createSelector.createSelector)(gridFilterActiveItemsSelector, activeFilters => {
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
exports.gridFilterActiveItemsLookupSelector = gridFilterActiveItemsLookupSelector;
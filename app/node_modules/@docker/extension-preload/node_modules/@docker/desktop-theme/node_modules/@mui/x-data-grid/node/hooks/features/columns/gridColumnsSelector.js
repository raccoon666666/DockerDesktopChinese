"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visibleGridColumnsSelector = exports.visibleGridColumnsLengthSelector = exports.gridVisibleColumnFieldsSelector = exports.gridVisibleColumnDefinitionsSelector = exports.gridFilterableColumnLookupSelector = exports.gridFilterableColumnDefinitionsSelector = exports.gridColumnsTotalWidthSelector = exports.gridColumnsSelector = exports.gridColumnsMetaSelector = exports.gridColumnVisibilityModelSelector = exports.gridColumnPositionsSelector = exports.gridColumnLookupSelector = exports.gridColumnFieldsSelector = exports.gridColumnDefinitionsSelector = exports.filterableGridColumnsSelector = exports.filterableGridColumnsIdsSelector = exports.allGridColumnsSelector = exports.allGridColumnsFieldsSelector = void 0;

var _createSelector = require("../../../utils/createSelector");

var _warning = require("../../../utils/warning");

/**
 * @category Columns
 * @deprecated Use the selector returning exactly the value you are looking for.
 * @ignore - do not document.
 * TODO v6: Rename `gridColumnsStateSelector`
 */
const gridColumnsSelector = state => state.columns;
/**
 * Get the field of each column.
 * @category Columns
 */


exports.gridColumnsSelector = gridColumnsSelector;
const gridColumnFieldsSelector = (0, _createSelector.createSelector)(gridColumnsSelector, columnsState => columnsState.all);
/**
 * Get the columns as a lookup (an object containing the field for keys and the definition for values).
 * @category Columns
 */

exports.gridColumnFieldsSelector = gridColumnFieldsSelector;
const gridColumnLookupSelector = (0, _createSelector.createSelector)(gridColumnsSelector, columnsState => columnsState.lookup);
/**
 * Get the columns as an array.
 * @category Columns
 */

exports.gridColumnLookupSelector = gridColumnLookupSelector;
const gridColumnDefinitionsSelector = (0, _createSelector.createSelector)(gridColumnFieldsSelector, gridColumnLookupSelector, (allFields, lookup) => allFields.map(field => lookup[field]));
/**
 * Get the column visibility model, containing the visibility status of each column.
 * If a column is not registered in the model, it is visible.
 * @category Visible Columns
 */

exports.gridColumnDefinitionsSelector = gridColumnDefinitionsSelector;
const gridColumnVisibilityModelSelector = (0, _createSelector.createSelector)(gridColumnsSelector, columnsState => columnsState.columnVisibilityModel);
/**
 * Get the visible columns as a lookup (an object containing the field for keys and the definition for values).
 * @category Visible Columns
 */

exports.gridColumnVisibilityModelSelector = gridColumnVisibilityModelSelector;
const gridVisibleColumnDefinitionsSelector = (0, _createSelector.createSelector)(gridColumnDefinitionsSelector, gridColumnVisibilityModelSelector, (columns, columnVisibilityModel) => columns.filter(column => columnVisibilityModel[column.field] !== false));
/**
 * Get the field of each visible column.
 * @category Visible Columns
 */

exports.gridVisibleColumnDefinitionsSelector = gridVisibleColumnDefinitionsSelector;
const gridVisibleColumnFieldsSelector = (0, _createSelector.createSelector)(gridVisibleColumnDefinitionsSelector, visibleColumns => visibleColumns.map(column => column.field));
/**
 * Get the left position in pixel of each visible columns relative to the left of the first column.
 * @category Visible Columns
 */

exports.gridVisibleColumnFieldsSelector = gridVisibleColumnFieldsSelector;
const gridColumnPositionsSelector = (0, _createSelector.createSelector)(gridVisibleColumnDefinitionsSelector, visibleColumns => {
  const positions = [];
  let currentPosition = 0;

  for (let i = 0; i < visibleColumns.length; i += 1) {
    positions.push(currentPosition);
    currentPosition += visibleColumns[i].computedWidth;
  }

  return positions;
});
/**
 * Get the summed width of all the visible columns.
 * @category Visible Columns
 */

exports.gridColumnPositionsSelector = gridColumnPositionsSelector;
const gridColumnsTotalWidthSelector = (0, _createSelector.createSelector)(gridVisibleColumnDefinitionsSelector, gridColumnPositionsSelector, (visibleColumns, positions) => {
  const colCount = visibleColumns.length;

  if (colCount === 0) {
    return 0;
  }

  return positions[colCount - 1] + visibleColumns[colCount - 1].computedWidth;
});
/**
 * Get the filterable columns as an array.
 * @category Columns
 */

exports.gridColumnsTotalWidthSelector = gridColumnsTotalWidthSelector;
const gridFilterableColumnDefinitionsSelector = (0, _createSelector.createSelector)(gridColumnDefinitionsSelector, columns => columns.filter(col => col.filterable));
/**
 * Get the filterable columns as a lookup (an object containing the field for keys and the definition for values).
 * @category Columns
 */

exports.gridFilterableColumnDefinitionsSelector = gridFilterableColumnDefinitionsSelector;
const gridFilterableColumnLookupSelector = (0, _createSelector.createSelector)(gridColumnDefinitionsSelector, columns => columns.reduce((acc, col) => {
  if (col.filterable) {
    acc[col.field] = col;
  }

  return acc;
}, {}));
/**
 * @category Columns
 * @deprecated Use `gridColumnFieldsSelector` instead.
 * @ignore - do not document.
 */

exports.gridFilterableColumnLookupSelector = gridFilterableColumnLookupSelector;
const allGridColumnsFieldsSelector = (0, _warning.wrapWithWarningOnCall)(gridColumnFieldsSelector, ['MUI: The method allGridColumnsFieldsSelector is deprecated and will be removed in the next major version.', 'Use gridColumnFieldsSelector instead']);
/**
 * @category Columns
 * @deprecated Use `gridColumnDefinitionsSelector` instead.
 * @ignore - do not document.
 */

exports.allGridColumnsFieldsSelector = allGridColumnsFieldsSelector;
const allGridColumnsSelector = (0, _warning.wrapWithWarningOnCall)(gridColumnDefinitionsSelector, ['MUI: The method allGridColumnsSelector is deprecated and will be removed in the next major version.', 'Use gridColumnDefinitionsSelector instead']);
/**
 * @category Visible Columns
 * @deprecated Use `gridVisibleColumnDefinitionsSelector` instead.
 * @ignore - do not document.
 */

exports.allGridColumnsSelector = allGridColumnsSelector;
const visibleGridColumnsSelector = (0, _warning.wrapWithWarningOnCall)(gridVisibleColumnDefinitionsSelector, ['MUI: The method visibleGridColumnsSelector is deprecated and will be removed in the next major version.', 'Use gridVisibleColumnDefinitionsSelector instead']);
/**
 * @category Columns
 * @deprecated Use `gridFilterableColumnDefinitionsSelector` instead.
 * @ignore - do not document.
 */

exports.visibleGridColumnsSelector = visibleGridColumnsSelector;
const filterableGridColumnsSelector = (0, _warning.wrapWithWarningOnCall)(gridFilterableColumnDefinitionsSelector, ['MUI: The method filterableGridColumnsSelector is deprecated and will be removed in the next major version.', 'Use gridFilterableColumnDefinitionsSelector instead']);
/**
 * @category Columns
 * @deprecated Use `gridFilterableColumnLookupSelector` instead (not the same return format).
 * @ignore - do not document.
 */

exports.filterableGridColumnsSelector = filterableGridColumnsSelector;
const filterableGridColumnsIdsSelector = (0, _warning.wrapWithWarningOnCall)((0, _createSelector.createSelector)(gridFilterableColumnDefinitionsSelector, columns => columns.map(col => col.field)), ['MUI: The method filterableGridColumnsIdsSelector is deprecated and will be removed in the next major version.', 'Use gridFilterableColumnDefinitionsSelector instead.', 'The return format is now a lookup, if you want to get the same output as before, use the following code:', '', 'const lookup = gridFilterableColumnLookupSelector(apiRef);', 'const fields = gridColumnFieldsSelector(apiRef).filter(field => lookup[field]);']);
/**
 * Get the amount of visible columns.
 * @category Visible Columns
 * @deprecated Use the length of the array returned by `gridVisibleColumnDefinitionsSelector` instead.
 * @ignore - do not document.
 */

exports.filterableGridColumnsIdsSelector = filterableGridColumnsIdsSelector;
const visibleGridColumnsLengthSelector = (0, _warning.wrapWithWarningOnCall)((0, _createSelector.createSelector)(gridVisibleColumnDefinitionsSelector, visibleColumns => visibleColumns.length), ['MUI: The method visibleGridColumnsLengthSelector is deprecated and will be removed in the next major version.', 'Use the length of the array returned by gridVisibleColumnDefinitionsSelector instead.']);
/**
 * @category Visible Columns
 * @deprecated Use `gridColumnsTotalWidthSelector` or `gridColumnPositionsSelector` instead.
 * @ignore - do not document.
 */

exports.visibleGridColumnsLengthSelector = visibleGridColumnsLengthSelector;
const gridColumnsMetaSelector = (0, _warning.wrapWithWarningOnCall)((0, _createSelector.createSelector)(gridColumnPositionsSelector, gridColumnsTotalWidthSelector, (positions, totalWidth) => ({
  totalWidth,
  positions
})), ['MUI: The method gridColumnsMetaSelector is deprecated and will be removed in the next major version.', 'Use gridColumnsTotalWidthSelector or gridColumnPositionsSelector instead']);
exports.gridColumnsMetaSelector = gridColumnsMetaSelector;
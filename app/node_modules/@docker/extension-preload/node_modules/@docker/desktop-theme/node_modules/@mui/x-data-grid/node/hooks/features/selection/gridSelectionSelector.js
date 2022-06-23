"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectedIdsLookupSelector = exports.selectedGridRowsSelector = exports.selectedGridRowsCountSelector = exports.gridSelectionStateSelector = void 0;

var _createSelector = require("../../../utils/createSelector");

var _gridRowsSelector = require("../rows/gridRowsSelector");

const gridSelectionStateSelector = state => state.selection;

exports.gridSelectionStateSelector = gridSelectionStateSelector;
const selectedGridRowsCountSelector = (0, _createSelector.createSelector)(gridSelectionStateSelector, selection => selection.length);
exports.selectedGridRowsCountSelector = selectedGridRowsCountSelector;
const selectedGridRowsSelector = (0, _createSelector.createSelector)(gridSelectionStateSelector, _gridRowsSelector.gridRowsLookupSelector, (selectedRows, rowsLookup) => new Map(selectedRows.map(id => [id, rowsLookup[id]])));
exports.selectedGridRowsSelector = selectedGridRowsSelector;
const selectedIdsLookupSelector = (0, _createSelector.createSelector)(gridSelectionStateSelector, selection => selection.reduce((lookup, rowId) => {
  lookup[rowId] = rowId;
  return lookup;
}, {}));
exports.selectedIdsLookupSelector = selectedIdsLookupSelector;
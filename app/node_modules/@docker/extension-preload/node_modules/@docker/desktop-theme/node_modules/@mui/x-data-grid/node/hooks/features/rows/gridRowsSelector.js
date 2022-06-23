"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridTopLevelRowCountSelector = exports.gridRowsStateSelector = exports.gridRowsLookupSelector = exports.gridRowTreeSelector = exports.gridRowTreeDepthSelector = exports.gridRowIdsSelector = exports.gridRowGroupingNameSelector = exports.gridRowCountSelector = void 0;

var _createSelector = require("../../../utils/createSelector");

const gridRowsStateSelector = state => state.rows;

exports.gridRowsStateSelector = gridRowsStateSelector;
const gridRowCountSelector = (0, _createSelector.createSelector)(gridRowsStateSelector, rows => rows.totalRowCount);
exports.gridRowCountSelector = gridRowCountSelector;
const gridTopLevelRowCountSelector = (0, _createSelector.createSelector)(gridRowsStateSelector, rows => rows.totalTopLevelRowCount);
exports.gridTopLevelRowCountSelector = gridTopLevelRowCountSelector;
const gridRowsLookupSelector = (0, _createSelector.createSelector)(gridRowsStateSelector, rows => rows.idRowsLookup);
exports.gridRowsLookupSelector = gridRowsLookupSelector;
const gridRowTreeSelector = (0, _createSelector.createSelector)(gridRowsStateSelector, rows => rows.tree);
exports.gridRowTreeSelector = gridRowTreeSelector;
const gridRowGroupingNameSelector = (0, _createSelector.createSelector)(gridRowsStateSelector, rows => rows.groupingName);
exports.gridRowGroupingNameSelector = gridRowGroupingNameSelector;
const gridRowTreeDepthSelector = (0, _createSelector.createSelector)(gridRowsStateSelector, rows => rows.treeDepth);
exports.gridRowTreeDepthSelector = gridRowTreeDepthSelector;
const gridRowIdsSelector = (0, _createSelector.createSelector)(gridRowsStateSelector, rows => rows.ids);
exports.gridRowIdsSelector = gridRowIdsSelector;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridRowGroupingStateSelector = exports.gridRowGroupingSanitizedModelSelector = exports.gridRowGroupingModelSelector = void 0;

var _xDataGrid = require("@mui/x-data-grid");

var _internals = require("@mui/x-data-grid/internals");

const gridRowGroupingStateSelector = state => state.rowGrouping;

exports.gridRowGroupingStateSelector = gridRowGroupingStateSelector;
const gridRowGroupingModelSelector = (0, _internals.createSelector)(gridRowGroupingStateSelector, rowGrouping => rowGrouping.model);
exports.gridRowGroupingModelSelector = gridRowGroupingModelSelector;
const gridRowGroupingSanitizedModelSelector = (0, _internals.createSelector)(gridRowGroupingModelSelector, _xDataGrid.gridColumnLookupSelector, (model, columnsLookup) => model.filter(field => !!columnsLookup[field] && columnsLookup[field].groupable));
exports.gridRowGroupingSanitizedModelSelector = gridRowGroupingSanitizedModelSelector;
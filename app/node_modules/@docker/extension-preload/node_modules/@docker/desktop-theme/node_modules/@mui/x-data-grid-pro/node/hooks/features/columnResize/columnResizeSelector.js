"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridResizingColumnFieldSelector = exports.gridColumnResizeSelector = void 0;

var _internals = require("@mui/x-data-grid/internals");

const gridColumnResizeSelector = state => state.columnResize;

exports.gridColumnResizeSelector = gridColumnResizeSelector;
const gridResizingColumnFieldSelector = (0, _internals.createSelector)(gridColumnResizeSelector, columnResize => columnResize.resizingColumnField);
exports.gridResizingColumnFieldSelector = gridResizingColumnFieldSelector;
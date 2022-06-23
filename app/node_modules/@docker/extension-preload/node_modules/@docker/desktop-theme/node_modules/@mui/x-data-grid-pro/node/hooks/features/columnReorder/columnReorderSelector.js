"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridColumnReorderSelector = exports.gridColumnReorderDragColSelector = void 0;

var _internals = require("@mui/x-data-grid/internals");

const gridColumnReorderSelector = state => state.columnReorder;

exports.gridColumnReorderSelector = gridColumnReorderSelector;
const gridColumnReorderDragColSelector = (0, _internals.createSelector)(gridColumnReorderSelector, columnReorder => columnReorder.dragCol);
exports.gridColumnReorderDragColSelector = gridColumnReorderDragColSelector;
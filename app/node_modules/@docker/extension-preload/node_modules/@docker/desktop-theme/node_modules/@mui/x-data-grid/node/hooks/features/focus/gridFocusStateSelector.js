"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridTabIndexStateSelector = exports.gridTabIndexColumnHeaderSelector = exports.gridTabIndexCellSelector = exports.gridFocusStateSelector = exports.gridFocusColumnHeaderSelector = exports.gridFocusCellSelector = void 0;

var _createSelector = require("../../../utils/createSelector");

const gridFocusStateSelector = state => state.focus;

exports.gridFocusStateSelector = gridFocusStateSelector;
const gridFocusCellSelector = (0, _createSelector.createSelector)(gridFocusStateSelector, focusState => focusState.cell);
exports.gridFocusCellSelector = gridFocusCellSelector;
const gridFocusColumnHeaderSelector = (0, _createSelector.createSelector)(gridFocusStateSelector, focusState => focusState.columnHeader);
exports.gridFocusColumnHeaderSelector = gridFocusColumnHeaderSelector;

const gridTabIndexStateSelector = state => state.tabIndex;

exports.gridTabIndexStateSelector = gridTabIndexStateSelector;
const gridTabIndexCellSelector = (0, _createSelector.createSelector)(gridTabIndexStateSelector, state => state.cell);
exports.gridTabIndexCellSelector = gridTabIndexCellSelector;
const gridTabIndexColumnHeaderSelector = (0, _createSelector.createSelector)(gridTabIndexStateSelector, state => state.columnHeader);
exports.gridTabIndexColumnHeaderSelector = gridTabIndexColumnHeaderSelector;
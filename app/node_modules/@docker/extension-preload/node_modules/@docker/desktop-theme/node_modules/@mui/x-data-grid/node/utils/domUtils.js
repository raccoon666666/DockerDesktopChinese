"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findParentElementFromClassName = findParentElementFromClassName;
exports.getGridCellElement = getGridCellElement;
exports.getGridColumnHeaderElement = getGridColumnHeaderElement;
exports.getGridRowElement = getGridRowElement;
exports.getRowEl = getRowEl;
exports.isGridCellRoot = isGridCellRoot;
exports.isGridHeaderCellRoot = isGridHeaderCellRoot;
exports.isOverflown = isOverflown;

var _gridClasses = require("../constants/gridClasses");

function isOverflown(element) {
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function findParentElementFromClassName(elem, className) {
  return elem.closest(`.${className}`);
}

function getRowEl(cell) {
  if (!cell) {
    return null;
  }

  return findParentElementFromClassName(cell, _gridClasses.gridClasses.row);
} // TODO remove


function isGridCellRoot(elem) {
  return elem != null && elem.classList.contains(_gridClasses.gridClasses.cell);
}

function isGridHeaderCellRoot(elem) {
  return elem != null && elem.classList.contains(_gridClasses.gridClasses.columnHeader);
}

function escapeOperandAttributeSelector(operand) {
  return operand.replace(/["\\]/g, '\\$&');
}

function getGridColumnHeaderElement(root, field) {
  return root.querySelector(`[role="columnheader"][data-field="${escapeOperandAttributeSelector(field)}"]`);
}

function getGridRowElement(root, id) {
  return root.querySelector(`.${_gridClasses.gridClasses.row}[data-id="${escapeOperandAttributeSelector(String(id))}"]`);
}

function getGridCellElement(root, {
  id,
  field
}) {
  const row = getGridRowElement(root, id);

  if (!row) {
    return null;
  }

  return row.querySelector(`.${_gridClasses.gridClasses.cell}[data-field="${escapeOperandAttributeSelector(field)}"]`);
}
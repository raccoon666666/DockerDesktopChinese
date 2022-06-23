import { gridClasses } from '../constants/gridClasses';
export function isOverflown(element) {
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}
export function findParentElementFromClassName(elem, className) {
  return elem.closest(`.${className}`);
}
export function getRowEl(cell) {
  if (!cell) {
    return null;
  }

  return findParentElementFromClassName(cell, gridClasses.row);
} // TODO remove

export function isGridCellRoot(elem) {
  return elem != null && elem.classList.contains(gridClasses.cell);
}
export function isGridHeaderCellRoot(elem) {
  return elem != null && elem.classList.contains(gridClasses.columnHeader);
}

function escapeOperandAttributeSelector(operand) {
  return operand.replace(/["\\]/g, '\\$&');
}

export function getGridColumnHeaderElement(root, field) {
  return root.querySelector(`[role="columnheader"][data-field="${escapeOperandAttributeSelector(field)}"]`);
}
export function getGridRowElement(root, id) {
  return root.querySelector(`.${gridClasses.row}[data-id="${escapeOperandAttributeSelector(String(id))}"]`);
}
export function getGridCellElement(root, {
  id,
  field
}) {
  const row = getGridRowElement(root, id);

  if (!row) {
    return null;
  }

  return row.querySelector(`.${gridClasses.cell}[data-field="${escapeOperandAttributeSelector(field)}"]`);
}
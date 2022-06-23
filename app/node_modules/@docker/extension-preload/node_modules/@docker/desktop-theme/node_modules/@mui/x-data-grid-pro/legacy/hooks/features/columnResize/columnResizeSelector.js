import { createSelector } from '@mui/x-data-grid/internals';
export var gridColumnResizeSelector = function gridColumnResizeSelector(state) {
  return state.columnResize;
};
export var gridResizingColumnFieldSelector = createSelector(gridColumnResizeSelector, function (columnResize) {
  return columnResize.resizingColumnField;
});
import { createSelector } from '@mui/x-data-grid/internals';
export var gridColumnReorderSelector = function gridColumnReorderSelector(state) {
  return state.columnReorder;
};
export var gridColumnReorderDragColSelector = createSelector(gridColumnReorderSelector, function (columnReorder) {
  return columnReorder.dragCol;
});
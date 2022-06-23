import { createSelector } from '@mui/x-data-grid/internals';
export const gridColumnReorderSelector = state => state.columnReorder;
export const gridColumnReorderDragColSelector = createSelector(gridColumnReorderSelector, columnReorder => columnReorder.dragCol);
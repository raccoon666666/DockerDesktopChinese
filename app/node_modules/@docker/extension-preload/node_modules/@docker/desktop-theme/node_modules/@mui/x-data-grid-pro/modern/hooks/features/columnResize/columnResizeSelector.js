import { createSelector } from '@mui/x-data-grid/internals';
export const gridColumnResizeSelector = state => state.columnResize;
export const gridResizingColumnFieldSelector = createSelector(gridColumnResizeSelector, columnResize => columnResize.resizingColumnField);
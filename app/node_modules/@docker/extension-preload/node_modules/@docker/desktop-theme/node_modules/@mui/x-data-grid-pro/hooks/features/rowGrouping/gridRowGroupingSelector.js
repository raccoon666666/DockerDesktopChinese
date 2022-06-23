import { gridColumnLookupSelector } from '@mui/x-data-grid';
import { createSelector } from '@mui/x-data-grid/internals';
export const gridRowGroupingStateSelector = state => state.rowGrouping;
export const gridRowGroupingModelSelector = createSelector(gridRowGroupingStateSelector, rowGrouping => rowGrouping.model);
export const gridRowGroupingSanitizedModelSelector = createSelector(gridRowGroupingModelSelector, gridColumnLookupSelector, (model, columnsLookup) => model.filter(field => !!columnsLookup[field] && columnsLookup[field].groupable));
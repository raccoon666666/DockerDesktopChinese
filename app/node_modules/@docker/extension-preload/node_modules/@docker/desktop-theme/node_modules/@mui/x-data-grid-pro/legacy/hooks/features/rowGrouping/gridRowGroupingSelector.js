import { gridColumnLookupSelector } from '@mui/x-data-grid';
import { createSelector } from '@mui/x-data-grid/internals';
export var gridRowGroupingStateSelector = function gridRowGroupingStateSelector(state) {
  return state.rowGrouping;
};
export var gridRowGroupingModelSelector = createSelector(gridRowGroupingStateSelector, function (rowGrouping) {
  return rowGrouping.model;
});
export var gridRowGroupingSanitizedModelSelector = createSelector(gridRowGroupingModelSelector, gridColumnLookupSelector, function (model, columnsLookup) {
  return model.filter(function (field) {
    return !!columnsLookup[field] && columnsLookup[field].groupable;
  });
});
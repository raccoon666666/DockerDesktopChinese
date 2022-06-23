import { createSelector } from '../../../utils/createSelector';
export var gridRowsStateSelector = function gridRowsStateSelector(state) {
  return state.rows;
};
export var gridRowCountSelector = createSelector(gridRowsStateSelector, function (rows) {
  return rows.totalRowCount;
});
export var gridTopLevelRowCountSelector = createSelector(gridRowsStateSelector, function (rows) {
  return rows.totalTopLevelRowCount;
});
export var gridRowsLookupSelector = createSelector(gridRowsStateSelector, function (rows) {
  return rows.idRowsLookup;
});
export var gridRowTreeSelector = createSelector(gridRowsStateSelector, function (rows) {
  return rows.tree;
});
export var gridRowGroupingNameSelector = createSelector(gridRowsStateSelector, function (rows) {
  return rows.groupingName;
});
export var gridRowTreeDepthSelector = createSelector(gridRowsStateSelector, function (rows) {
  return rows.treeDepth;
});
export var gridRowIdsSelector = createSelector(gridRowsStateSelector, function (rows) {
  return rows.ids;
});
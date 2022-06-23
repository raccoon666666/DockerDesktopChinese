import { createSelector } from '../../../utils/createSelector';
export var gridFocusStateSelector = function gridFocusStateSelector(state) {
  return state.focus;
};
export var gridFocusCellSelector = createSelector(gridFocusStateSelector, function (focusState) {
  return focusState.cell;
});
export var gridFocusColumnHeaderSelector = createSelector(gridFocusStateSelector, function (focusState) {
  return focusState.columnHeader;
});
export var gridTabIndexStateSelector = function gridTabIndexStateSelector(state) {
  return state.tabIndex;
};
export var gridTabIndexCellSelector = createSelector(gridTabIndexStateSelector, function (state) {
  return state.cell;
});
export var gridTabIndexColumnHeaderSelector = createSelector(gridTabIndexStateSelector, function (state) {
  return state.columnHeader;
});
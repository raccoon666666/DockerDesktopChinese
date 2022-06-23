import { createSelector } from '../../../utils/createSelector';
export const gridFocusStateSelector = state => state.focus;
export const gridFocusCellSelector = createSelector(gridFocusStateSelector, focusState => focusState.cell);
export const gridFocusColumnHeaderSelector = createSelector(gridFocusStateSelector, focusState => focusState.columnHeader);
export const gridTabIndexStateSelector = state => state.tabIndex;
export const gridTabIndexCellSelector = createSelector(gridTabIndexStateSelector, state => state.cell);
export const gridTabIndexColumnHeaderSelector = createSelector(gridTabIndexStateSelector, state => state.columnHeader);
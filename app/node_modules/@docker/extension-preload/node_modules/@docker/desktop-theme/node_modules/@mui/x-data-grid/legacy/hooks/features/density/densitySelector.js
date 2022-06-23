import { createSelector } from '../../../utils/createSelector';
export var gridDensitySelector = function gridDensitySelector(state) {
  return state.density;
};
export var gridDensityValueSelector = createSelector(gridDensitySelector, function (density) {
  return density.value;
});
export var gridDensityRowHeightSelector = createSelector(gridDensitySelector, function (density) {
  return density.rowHeight;
});
export var gridDensityHeaderHeightSelector = createSelector(gridDensitySelector, function (density) {
  return density.headerHeight;
});
export var gridDensityFactorSelector = createSelector(gridDensitySelector, function (density) {
  return density.factor;
});
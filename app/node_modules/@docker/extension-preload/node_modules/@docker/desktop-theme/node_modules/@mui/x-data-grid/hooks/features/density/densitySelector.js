import { createSelector } from '../../../utils/createSelector';
export const gridDensitySelector = state => state.density;
export const gridDensityValueSelector = createSelector(gridDensitySelector, density => density.value);
export const gridDensityRowHeightSelector = createSelector(gridDensitySelector, density => density.rowHeight);
export const gridDensityHeaderHeightSelector = createSelector(gridDensitySelector, density => density.headerHeight);
export const gridDensityFactorSelector = createSelector(gridDensitySelector, density => density.factor);
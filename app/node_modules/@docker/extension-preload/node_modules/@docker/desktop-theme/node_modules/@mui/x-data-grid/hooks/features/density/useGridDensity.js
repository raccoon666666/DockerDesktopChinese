import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { GridDensityTypes } from '../../../models/gridDensity';
import { useGridLogger } from '../../utils/useGridLogger';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
import { gridDensitySelector } from './densitySelector';
import { isDeepEqual } from '../../../utils/utils';
export const COMPACT_DENSITY_FACTOR = 0.7;
export const COMFORTABLE_DENSITY_FACTOR = 1.3; // TODO v6: revise keeping headerHeight and rowHeight in state

const getUpdatedDensityState = (newDensity, newHeaderHeight, newRowHeight) => {
  switch (newDensity) {
    case GridDensityTypes.Compact:
      return {
        value: newDensity,
        headerHeight: Math.floor(newHeaderHeight * COMPACT_DENSITY_FACTOR),
        rowHeight: Math.floor(newRowHeight * COMPACT_DENSITY_FACTOR),
        factor: COMPACT_DENSITY_FACTOR
      };

    case GridDensityTypes.Comfortable:
      return {
        value: newDensity,
        headerHeight: Math.floor(newHeaderHeight * COMFORTABLE_DENSITY_FACTOR),
        rowHeight: Math.floor(newRowHeight * COMFORTABLE_DENSITY_FACTOR),
        factor: COMFORTABLE_DENSITY_FACTOR
      };

    default:
      return {
        value: newDensity,
        headerHeight: newHeaderHeight,
        rowHeight: newRowHeight,
        factor: 1
      };
  }
};

export const densityStateInitializer = (state, props) => _extends({}, state, {
  density: getUpdatedDensityState(props.density, props.headerHeight, props.rowHeight)
});
export const useGridDensity = (apiRef, props) => {
  const logger = useGridLogger(apiRef, 'useDensity');
  const setDensity = React.useCallback((newDensity, newHeaderHeight = props.headerHeight, newRowHeight = props.rowHeight) => {
    logger.debug(`Set grid density to ${newDensity}`);
    apiRef.current.setState(state => {
      const currentDensityState = gridDensitySelector(state);
      const newDensityState = getUpdatedDensityState(newDensity, newHeaderHeight, newRowHeight);

      if (isDeepEqual(currentDensityState, newDensityState)) {
        return state;
      }

      return _extends({}, state, {
        density: newDensityState
      });
    });
    apiRef.current.forceUpdate();
  }, [logger, apiRef, props.headerHeight, props.rowHeight]);
  React.useEffect(() => {
    apiRef.current.setDensity(props.density, props.headerHeight, props.rowHeight);
  }, [apiRef, props.density, props.rowHeight, props.headerHeight]);
  const densityApi = {
    setDensity
  };
  useGridApiMethod(apiRef, densityApi, 'GridDensityApi');
};
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { GridDensityTypes } from '../../../models/gridDensity';
import { useGridLogger } from '../../utils/useGridLogger';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
import { gridDensitySelector } from './densitySelector';
import { isDeepEqual } from '../../../utils/utils';
export var COMPACT_DENSITY_FACTOR = 0.7;
export var COMFORTABLE_DENSITY_FACTOR = 1.3; // TODO v6: revise keeping headerHeight and rowHeight in state

var getUpdatedDensityState = function getUpdatedDensityState(newDensity, newHeaderHeight, newRowHeight) {
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

export var densityStateInitializer = function densityStateInitializer(state, props) {
  return _extends({}, state, {
    density: getUpdatedDensityState(props.density, props.headerHeight, props.rowHeight)
  });
};
export var useGridDensity = function useGridDensity(apiRef, props) {
  var logger = useGridLogger(apiRef, 'useDensity');
  var setDensity = React.useCallback(function (newDensity) {
    var newHeaderHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : props.headerHeight;
    var newRowHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : props.rowHeight;
    logger.debug("Set grid density to ".concat(newDensity));
    apiRef.current.setState(function (state) {
      var currentDensityState = gridDensitySelector(state);
      var newDensityState = getUpdatedDensityState(newDensity, newHeaderHeight, newRowHeight);

      if (isDeepEqual(currentDensityState, newDensityState)) {
        return state;
      }

      return _extends({}, state, {
        density: newDensityState
      });
    });
    apiRef.current.forceUpdate();
  }, [logger, apiRef, props.headerHeight, props.rowHeight]);
  React.useEffect(function () {
    apiRef.current.setDensity(props.density, props.headerHeight, props.rowHeight);
  }, [apiRef, props.density, props.rowHeight, props.headerHeight]);
  var densityApi = {
    setDensity: setDensity
  };
  useGridApiMethod(apiRef, densityApi, 'GridDensityApi');
};
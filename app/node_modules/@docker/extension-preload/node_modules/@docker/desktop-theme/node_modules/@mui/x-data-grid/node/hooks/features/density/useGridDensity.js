"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridDensity = exports.densityStateInitializer = exports.COMPACT_DENSITY_FACTOR = exports.COMFORTABLE_DENSITY_FACTOR = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _gridDensity = require("../../../models/gridDensity");

var _useGridLogger = require("../../utils/useGridLogger");

var _useGridApiMethod = require("../../utils/useGridApiMethod");

var _densitySelector = require("./densitySelector");

var _utils = require("../../../utils/utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const COMPACT_DENSITY_FACTOR = 0.7;
exports.COMPACT_DENSITY_FACTOR = COMPACT_DENSITY_FACTOR;
const COMFORTABLE_DENSITY_FACTOR = 1.3; // TODO v6: revise keeping headerHeight and rowHeight in state

exports.COMFORTABLE_DENSITY_FACTOR = COMFORTABLE_DENSITY_FACTOR;

const getUpdatedDensityState = (newDensity, newHeaderHeight, newRowHeight) => {
  switch (newDensity) {
    case _gridDensity.GridDensityTypes.Compact:
      return {
        value: newDensity,
        headerHeight: Math.floor(newHeaderHeight * COMPACT_DENSITY_FACTOR),
        rowHeight: Math.floor(newRowHeight * COMPACT_DENSITY_FACTOR),
        factor: COMPACT_DENSITY_FACTOR
      };

    case _gridDensity.GridDensityTypes.Comfortable:
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

const densityStateInitializer = (state, props) => (0, _extends2.default)({}, state, {
  density: getUpdatedDensityState(props.density, props.headerHeight, props.rowHeight)
});

exports.densityStateInitializer = densityStateInitializer;

const useGridDensity = (apiRef, props) => {
  const logger = (0, _useGridLogger.useGridLogger)(apiRef, 'useDensity');
  const setDensity = React.useCallback((newDensity, newHeaderHeight = props.headerHeight, newRowHeight = props.rowHeight) => {
    logger.debug(`Set grid density to ${newDensity}`);
    apiRef.current.setState(state => {
      const currentDensityState = (0, _densitySelector.gridDensitySelector)(state);
      const newDensityState = getUpdatedDensityState(newDensity, newHeaderHeight, newRowHeight);

      if ((0, _utils.isDeepEqual)(currentDensityState, newDensityState)) {
        return state;
      }

      return (0, _extends2.default)({}, state, {
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
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, densityApi, 'GridDensityApi');
};

exports.useGridDensity = useGridDensity;
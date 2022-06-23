"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSelector = void 0;

var _reselect = require("reselect");

var _warning = require("./warning");

const cache = {};
const missingInstanceIdWarning = (0, _warning.buildWarning)(['MUI: A selector was called without passing the instance ID, which may impact the performance of the grid.', 'To fix, call it with `apiRef`, e.g. `mySelector(apiRef)`, or pass the instance ID explicitly, e.g `mySelector(state, apiRef.current.instanceId)`.']);

const createSelector = (...args) => {
  const selector = (...selectorArgs) => {
    const [stateOrApiRef, instanceId] = selectorArgs;
    const isApiRef = !!stateOrApiRef.current;
    const cacheKey = isApiRef ? stateOrApiRef.current.instanceId : instanceId != null ? instanceId : 'default';
    const state = isApiRef ? stateOrApiRef.current.state : stateOrApiRef;

    if (process.env.NODE_ENV !== 'production') {
      if (cacheKey === 'default') {
        missingInstanceIdWarning();
      }
    }

    if (cache[cacheKey] && cache[cacheKey].get(args)) {
      // We pass the cache key because the called selector might have as
      // dependency another selector created with this `createSelector`.
      return cache[cacheKey].get(args)(state, cacheKey);
    }

    const newSelector = (0, _reselect.createSelector)(...args);

    if (!cache[cacheKey]) {
      cache[cacheKey] = new Map();
    }

    cache[cacheKey].set(args, newSelector);
    return newSelector(state, cacheKey);
  }; // We use this property to detect if the selector was created with createSelector
  // or it's only a simple function the receives the state and returns part of it.


  selector.cache = cache;
  return selector;
};

exports.createSelector = createSelector;
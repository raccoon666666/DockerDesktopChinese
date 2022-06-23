import { createSelector as reselectCreateSelector } from 'reselect';
import { buildWarning } from './warning';
var cache = {};
var missingInstanceIdWarning = buildWarning(['MUI: A selector was called without passing the instance ID, which may impact the performance of the grid.', 'To fix, call it with `apiRef`, e.g. `mySelector(apiRef)`, or pass the instance ID explicitly, e.g `mySelector(state, apiRef.current.instanceId)`.']);
export var createSelector = function createSelector() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var selector = function selector() {
    for (var _len2 = arguments.length, selectorArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      selectorArgs[_key2] = arguments[_key2];
    }

    var stateOrApiRef = selectorArgs[0],
        instanceId = selectorArgs[1];
    var isApiRef = !!stateOrApiRef.current;
    var cacheKey = isApiRef ? stateOrApiRef.current.instanceId : instanceId != null ? instanceId : 'default';
    var state = isApiRef ? stateOrApiRef.current.state : stateOrApiRef;

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

    var newSelector = reselectCreateSelector.apply(void 0, args);

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
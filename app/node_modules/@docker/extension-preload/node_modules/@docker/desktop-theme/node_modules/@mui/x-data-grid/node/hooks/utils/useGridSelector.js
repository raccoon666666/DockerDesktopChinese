"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridSelector = void 0;

var _warning = require("../../utils/warning");

function isOutputSelector(selector) {
  return selector.cache;
}

const stateNotInitializedWarning = (0, _warning.buildWarning)(['MUI: `useGridSelector` has been called before the initialization of the state.', 'This hook can only be used inside the context of the grid.']);

const useGridSelector = (apiRef, selector) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!apiRef.current.state) {
      stateNotInitializedWarning();
    }
  }

  if (isOutputSelector(selector)) {
    return selector(apiRef);
  }

  return selector(apiRef.current.state);
};

exports.useGridSelector = useGridSelector;
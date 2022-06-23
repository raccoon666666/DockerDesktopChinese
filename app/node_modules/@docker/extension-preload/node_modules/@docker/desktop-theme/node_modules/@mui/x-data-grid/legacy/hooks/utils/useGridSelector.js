import { buildWarning } from '../../utils/warning';

function isOutputSelector(selector) {
  return selector.cache;
}

var stateNotInitializedWarning = buildWarning(['MUI: `useGridSelector` has been called before the initialization of the state.', 'This hook can only be used inside the context of the grid.']);
export var useGridSelector = function useGridSelector(apiRef, selector) {
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
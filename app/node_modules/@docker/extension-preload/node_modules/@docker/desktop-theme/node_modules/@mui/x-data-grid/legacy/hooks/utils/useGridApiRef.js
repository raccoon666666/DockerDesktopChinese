import * as React from 'react';

/**
 * Hook that instantiate a [[GridApiRef]].
 */
export var useGridApiRef = function useGridApiRef() {
  return React.useRef({});
};
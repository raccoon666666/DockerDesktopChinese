import * as React from 'react';
export var useGridInitializeState = function useGridInitializeState(initializer, apiRef, props) {
  var isInitialized = React.useRef(false);

  if (!isInitialized.current) {
    apiRef.current.state = initializer(apiRef.current.state, props, apiRef);
    isInitialized.current = true;
  }
};
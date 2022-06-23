import * as React from 'react';
export const useGridInitializeState = (initializer, apiRef, props) => {
  const isInitialized = React.useRef(false);

  if (!isInitialized.current) {
    apiRef.current.state = initializer(apiRef.current.state, props, apiRef);
    isInitialized.current = true;
  }
};
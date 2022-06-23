import * as React from 'react';
export function useGridLogger(apiRef, name) {
  var logger = React.useRef(null);

  if (logger.current) {
    return logger.current;
  }

  var newLogger = apiRef.current.getLogger(name);
  logger.current = newLogger;
  return newLogger;
}
import * as React from 'react';
export function useGridLogger(apiRef, name) {
  const logger = React.useRef(null);

  if (logger.current) {
    return logger.current;
  }

  const newLogger = apiRef.current.getLogger(name);
  logger.current = newLogger;
  return newLogger;
}
import * as React from 'react';
export var useFirstRender = function useFirstRender(callback) {
  var isFirstRender = React.useRef(true);

  if (isFirstRender.current) {
    isFirstRender.current = false;
    callback();
  }
};
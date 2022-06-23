import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { GridEvents } from '../../models/events';
import { useGridApiEventHandler } from '../utils/useGridApiEventHandler';
export function useGridErrorHandler(apiRef, props) {
  var handleError = React.useCallback(function (args) {
    // We are handling error here, to set up the handler as early as possible and be able to catch error thrown at init time.
    apiRef.current.setState(function (state) {
      return _extends({}, state, {
        error: args
      });
    });
  }, [apiRef]);
  React.useEffect(function () {
    handleError(props.error);
  }, [handleError, props.error]);
  useGridApiEventHandler(apiRef, GridEvents.componentError, handleError);
}
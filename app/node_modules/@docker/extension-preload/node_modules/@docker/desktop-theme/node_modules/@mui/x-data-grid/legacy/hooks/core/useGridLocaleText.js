import * as React from 'react';
import { useGridApiMethod } from '../utils/useGridApiMethod';
export var useGridLocaleText = function useGridLocaleText(apiRef, props) {
  var getLocaleText = React.useCallback(function (key) {
    if (props.localeText[key] == null) {
      throw new Error("Missing translation for key ".concat(key, "."));
    }

    return props.localeText[key];
  }, [props.localeText]);
  var localeTextApi = {
    getLocaleText: getLocaleText
  };
  useGridApiMethod(apiRef, localeTextApi, 'LocaleTextApi');
};
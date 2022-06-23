import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
export function useGridApiMethod(apiRef, apiMethods, // TODO: Remove `apiName
// eslint-disable-next-line @typescript-eslint/no-unused-vars
apiName) {
  var apiMethodsRef = React.useRef(apiMethods);

  var _React$useState = React.useState(Object.keys(apiMethods)),
      _React$useState2 = _slicedToArray(_React$useState, 1),
      apiMethodsNames = _React$useState2[0];

  var installMethods = React.useCallback(function () {
    if (!apiRef.current) {
      return;
    }

    apiMethodsNames.forEach(function (methodName) {
      if (!apiRef.current.hasOwnProperty(methodName)) {
        apiRef.current[methodName] = function () {
          var _apiMethodsRef$curren;

          return (_apiMethodsRef$curren = apiMethodsRef.current)[methodName].apply(_apiMethodsRef$curren, arguments);
        };
      }
    });
  }, [apiMethodsNames, apiRef]);
  React.useEffect(function () {
    apiMethodsRef.current = apiMethods;
  }, [apiMethods]);
  React.useEffect(function () {
    installMethods();
  }, [installMethods]);
  installMethods();
}
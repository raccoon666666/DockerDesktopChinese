"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridApiMethod = useGridApiMethod;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function useGridApiMethod(apiRef, apiMethods, // TODO: Remove `apiName
// eslint-disable-next-line @typescript-eslint/no-unused-vars
apiName) {
  const apiMethodsRef = React.useRef(apiMethods);
  const [apiMethodsNames] = React.useState(Object.keys(apiMethods));
  const installMethods = React.useCallback(() => {
    if (!apiRef.current) {
      return;
    }

    apiMethodsNames.forEach(methodName => {
      if (!apiRef.current.hasOwnProperty(methodName)) {
        apiRef.current[methodName] = (...args) => apiMethodsRef.current[methodName](...args);
      }
    });
  }, [apiMethodsNames, apiRef]);
  React.useEffect(() => {
    apiMethodsRef.current = apiMethods;
  }, [apiMethods]);
  React.useEffect(() => {
    installMethods();
  }, [installMethods]);
  installMethods();
}
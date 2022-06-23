"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridContextProvider = void 0;

var React = _interopRequireWildcard(require("react"));

var _GridApiContext = require("../components/GridApiContext");

var _GridRootPropsContext = require("./GridRootPropsContext");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const GridContextProvider = ({
  apiRef,
  props,
  children
}) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridRootPropsContext.GridRootPropsContext.Provider, {
    value: props,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridApiContext.GridApiContext.Provider, {
      value: apiRef,
      children: children
    })
  });
};

exports.GridContextProvider = GridContextProvider;
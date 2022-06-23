"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridApiContext = useGridApiContext;

var React = _interopRequireWildcard(require("react"));

var _GridApiContext = require("../../components/GridApiContext");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function useGridApiContext() {
  const apiRef = React.useContext(_GridApiContext.GridApiContext);

  if (apiRef === undefined) {
    throw new Error(['MUI: Could not find the data grid context.', 'It looks like you rendered your component outside of a DataGrid or DataGridPro parent component.', 'This can also happen if you are bundling multiple versions of the data grid.'].join('\n'));
  }

  return apiRef;
}
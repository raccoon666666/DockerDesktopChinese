"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridRootProps = void 0;

var React = _interopRequireWildcard(require("react"));

var _GridRootPropsContext = require("../../context/GridRootPropsContext");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useGridRootProps = () => {
  const contextValue = React.useContext(_GridRootPropsContext.GridRootPropsContext);

  if (!contextValue) {
    throw new Error('MUI: useGridRootProps should only be used inside the DataGrid/DataGridPro component.');
  }

  return contextValue;
};

exports.useGridRootProps = useGridRootProps;
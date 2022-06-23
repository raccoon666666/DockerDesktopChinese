"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridGroupingColumnLeafCell = void 0;

var React = _interopRequireWildcard(require("react"));

var _Box = _interopRequireDefault(require("@mui/material/Box"));

var _useGridRootProps = require("../hooks/utils/useGridRootProps");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const GridGroupingColumnLeafCell = props => {
  var _props$formattedValue;

  const {
    rowNode
  } = props;
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const marginLeft = rootProps.rowGroupingColumnMode === 'multiple' ? 1 : rowNode.depth * 2;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Box.default, {
    sx: {
      ml: marginLeft
    },
    children: (_props$formattedValue = props.formattedValue) != null ? _props$formattedValue : props.value
  });
};

exports.GridGroupingColumnLeafCell = GridGroupingColumnLeafCell;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridHeader = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _useGridRootProps = require("../hooks/utils/useGridRootProps");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const GridHeader = /*#__PURE__*/React.forwardRef(function GridHeader(props, ref) {
  var _rootProps$components, _rootProps$components2;

  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", (0, _extends2.default)({
    ref: ref
  }, props, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.PreferencesPanel, (0, _extends2.default)({}, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.preferencesPanel)), rootProps.components.Toolbar && /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.Toolbar, (0, _extends2.default)({}, (_rootProps$components2 = rootProps.componentsProps) == null ? void 0 : _rootProps$components2.toolbar))]
  }));
});
exports.GridHeader = GridHeader;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridToolbarColumnsButton = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _useGridSelector = require("../../hooks/utils/useGridSelector");

var _gridPreferencePanelSelector = require("../../hooks/features/preferencesPanel/gridPreferencePanelSelector");

var _gridPreferencePanelsValue = require("../../hooks/features/preferencesPanel/gridPreferencePanelsValue");

var _useGridApiContext = require("../../hooks/utils/useGridApiContext");

var _useGridRootProps = require("../../hooks/utils/useGridRootProps");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["onClick"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const GridToolbarColumnsButton = /*#__PURE__*/React.forwardRef(function GridToolbarColumnsButton(props, ref) {
  var _rootProps$components;

  const {
    onClick
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const {
    open,
    openedPanelValue
  } = (0, _useGridSelector.useGridSelector)(apiRef, _gridPreferencePanelSelector.gridPreferencePanelStateSelector);

  const showColumns = event => {
    if (open && openedPanelValue === _gridPreferencePanelsValue.GridPreferencePanelsValue.columns) {
      apiRef.current.hidePreferences();
    } else {
      apiRef.current.showPreferences(_gridPreferencePanelsValue.GridPreferencePanelsValue.columns);
    }

    onClick == null ? void 0 : onClick(event);
  }; // Disable the button if the corresponding is disabled


  if (rootProps.disableColumnSelector) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.BaseButton, (0, _extends2.default)({
    ref: ref,
    size: "small",
    color: "primary",
    "aria-label": apiRef.current.getLocaleText('toolbarColumnsLabel'),
    startIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.ColumnSelectorIcon, {})
  }, other, {
    onClick: showColumns
  }, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.baseButton, {
    children: apiRef.current.getLocaleText('toolbarColumns')
  }));
});
exports.GridToolbarColumnsButton = GridToolbarColumnsButton;
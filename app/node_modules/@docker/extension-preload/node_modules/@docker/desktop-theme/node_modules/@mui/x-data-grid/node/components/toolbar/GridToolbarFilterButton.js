"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridToolbarFilterButton = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@mui/material/styles");

var _material = require("@mui/material");

var _Badge = _interopRequireDefault(require("@mui/material/Badge"));

var _utils = require("@mui/material/utils");

var _gridColumnsSelector = require("../../hooks/features/columns/gridColumnsSelector");

var _useGridSelector = require("../../hooks/utils/useGridSelector");

var _gridFilterSelector = require("../../hooks/features/filter/gridFilterSelector");

var _gridPreferencePanelSelector = require("../../hooks/features/preferencesPanel/gridPreferencePanelSelector");

var _gridPreferencePanelsValue = require("../../hooks/features/preferencesPanel/gridPreferencePanelsValue");

var _useGridApiContext = require("../../hooks/utils/useGridApiContext");

var _useGridRootProps = require("../../hooks/utils/useGridRootProps");

var _gridClasses = require("../../constants/gridClasses");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["componentsProps"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['toolbarFilterList']
  };
  return (0, _material.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};

const GridToolbarFilterListRoot = (0, _styles.styled)('ul', {
  name: 'MuiDataGrid',
  slot: 'ToolbarFilterList',
  overridesResolver: (props, styles) => styles.toolbarFilterList
})(({
  theme
}) => ({
  margin: theme.spacing(1, 1, 0.5),
  padding: theme.spacing(0, 1)
}));
const GridToolbarFilterButton = /*#__PURE__*/React.forwardRef(function GridToolbarFilterButton(props, ref) {
  var _rootProps$components, _rootProps$components2;

  const {
    componentsProps = {}
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const buttonProps = componentsProps.button || {};
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const activeFilters = (0, _useGridSelector.useGridSelector)(apiRef, _gridFilterSelector.gridFilterActiveItemsSelector);
  const lookup = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridColumnLookupSelector);
  const preferencePanel = (0, _useGridSelector.useGridSelector)(apiRef, _gridPreferencePanelSelector.gridPreferencePanelStateSelector);
  const ownerState = {
    classes: rootProps.classes
  };
  const classes = useUtilityClasses(ownerState);
  const tooltipContentNode = React.useMemo(() => {
    if (preferencePanel.open) {
      return apiRef.current.getLocaleText('toolbarFiltersTooltipHide');
    }

    if (activeFilters.length === 0) {
      return apiRef.current.getLocaleText('toolbarFiltersTooltipShow');
    }

    const getOperatorLabel = item => lookup[item.columnField].filterOperators.find(operator => operator.value === item.operatorValue).label || apiRef.current.getLocaleText(`filterOperator${(0, _utils.capitalize)(item.operatorValue)}`).toString();

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [apiRef.current.getLocaleText('toolbarFiltersTooltipActive')(activeFilters.length), /*#__PURE__*/(0, _jsxRuntime.jsx)(GridToolbarFilterListRoot, {
        className: classes.root,
        children: activeFilters.map((item, index) => (0, _extends2.default)({}, lookup[item.columnField] && /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
          children: `${lookup[item.columnField].headerName || item.columnField}
                  ${getOperatorLabel(item)}
                  ${item.value}`
        }, index)))
      })]
    });
  }, [apiRef, preferencePanel.open, activeFilters, lookup, classes]);

  const toggleFilter = event => {
    var _buttonProps$onClick;

    const {
      open,
      openedPanelValue
    } = preferencePanel;

    if (open && openedPanelValue === _gridPreferencePanelsValue.GridPreferencePanelsValue.filters) {
      apiRef.current.hideFilterPanel();
    } else {
      apiRef.current.showFilterPanel();
    }

    (_buttonProps$onClick = buttonProps.onClick) == null ? void 0 : _buttonProps$onClick.call(buttonProps, event);
  }; // Disable the button if the corresponding is disabled


  if (rootProps.disableColumnFilter) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.BaseTooltip, (0, _extends2.default)({
    title: tooltipContentNode,
    enterDelay: 1000
  }, other, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.baseTooltip, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.BaseButton, (0, _extends2.default)({
      ref: ref,
      size: "small",
      color: "primary",
      "aria-label": apiRef.current.getLocaleText('toolbarFiltersLabel'),
      startIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Badge.default, {
        badgeContent: activeFilters.length,
        color: "primary",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.OpenFilterButtonIcon, {})
      })
    }, buttonProps, {
      onClick: toggleFilter
    }, (_rootProps$components2 = rootProps.componentsProps) == null ? void 0 : _rootProps$components2.baseButton, {
      children: apiRef.current.getLocaleText('toolbarFilters')
    }))
  }));
});
exports.GridToolbarFilterButton = GridToolbarFilterButton;
process.env.NODE_ENV !== "production" ? GridToolbarFilterButton.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps: _propTypes.default.object
} : void 0;
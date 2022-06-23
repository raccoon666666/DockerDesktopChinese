"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDataGridProProps = exports.DATA_GRID_PRO_PROPS_DEFAULT_VALUES = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _styles = require("@mui/material/styles");

var _xDataGrid = require("@mui/x-data-grid");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * The default values of `DataGridProPropsWithDefaultValue` to inject in the props of DataGridPro.
 */
const DATA_GRID_PRO_PROPS_DEFAULT_VALUES = (0, _extends2.default)({}, _xDataGrid.DATA_GRID_PROPS_DEFAULT_VALUES, {
  scrollEndThreshold: 80,
  treeData: false,
  defaultGroupingExpansionDepth: 0,
  disableColumnPinning: false,
  disableRowGrouping: false,
  disableChildrenFiltering: false,
  disableChildrenSorting: false,
  rowGroupingColumnMode: 'single',
  getDetailPanelHeight: () => 500
});
exports.DATA_GRID_PRO_PROPS_DEFAULT_VALUES = DATA_GRID_PRO_PROPS_DEFAULT_VALUES;

const useDataGridProProps = inProps => {
  const themedProps = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiDataGrid'
  });
  const localeText = React.useMemo(() => (0, _extends2.default)({}, _xDataGrid.GRID_DEFAULT_LOCALE_TEXT, themedProps.localeText), [themedProps.localeText]);
  const components = React.useMemo(() => {
    const overrides = themedProps.components;

    if (!overrides) {
      return (0, _extends2.default)({}, _xDataGrid.DATA_GRID_DEFAULT_SLOTS_COMPONENTS);
    }

    const mergedComponents = {};
    Object.entries(_xDataGrid.DATA_GRID_DEFAULT_SLOTS_COMPONENTS).forEach(([key, defaultComponent]) => {
      mergedComponents[key] = overrides[key] === undefined ? defaultComponent : overrides[key];
    });
    return mergedComponents;
  }, [themedProps.components]);
  return React.useMemo(() => {
    var _themedProps$experime;

    return (0, _extends2.default)({}, DATA_GRID_PRO_PROPS_DEFAULT_VALUES, themedProps, {
      disableRowGrouping: themedProps.disableRowGrouping || !((_themedProps$experime = themedProps.experimentalFeatures) != null && _themedProps$experime.rowGrouping),
      localeText,
      components,
      signature: 'DataGridPro'
    });
  }, [themedProps, localeText, components]);
};

exports.useDataGridProProps = useDataGridProProps;
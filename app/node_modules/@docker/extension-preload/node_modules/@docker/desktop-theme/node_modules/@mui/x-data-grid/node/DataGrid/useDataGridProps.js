"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDataGridProps = exports.MAX_PAGE_SIZE = exports.DATA_GRID_PROPS_DEFAULT_VALUES = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _styles = require("@mui/material/styles");

var _constants = require("../constants");

var _models = require("../models");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const DATA_GRID_FORCED_PROPS = {
  apiRef: undefined,
  disableMultipleColumnsFiltering: true,
  disableMultipleColumnsSorting: true,
  disableMultipleSelection: true,
  throttleRowsMs: undefined,
  hideFooterRowCount: false,
  pagination: true,
  checkboxSelectionVisibleOnly: false,
  disableColumnReorder: true,
  disableColumnResize: true,
  signature: 'DataGrid'
};
const MAX_PAGE_SIZE = 100;
/**
 * The default values of `DataGridPropsWithDefaultValues` to inject in the props of DataGrid.
 */

exports.MAX_PAGE_SIZE = MAX_PAGE_SIZE;
const DATA_GRID_PROPS_DEFAULT_VALUES = {
  autoHeight: false,
  autoPageSize: false,
  checkboxSelection: false,
  checkboxSelectionVisibleOnly: false,
  columnBuffer: 3,
  rowBuffer: 3,
  columnThreshold: 3,
  rowThreshold: 3,
  density: _models.GridDensityTypes.Standard,
  disableExtendRowFullWidth: false,
  disableColumnFilter: false,
  disableColumnMenu: false,
  disableColumnSelector: false,
  disableDensitySelector: false,
  disableMultipleColumnsFiltering: false,
  disableMultipleSelection: false,
  disableMultipleColumnsSorting: false,
  disableSelectionOnClick: false,
  disableVirtualization: false,
  editMode: _models.GridEditModes.Cell,
  filterMode: _models.GridFeatureModeConstant.client,
  headerHeight: 56,
  hideFooter: false,
  hideFooterPagination: false,
  hideFooterRowCount: false,
  hideFooterSelectedRowCount: false,
  logger: console,
  logLevel: process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  pagination: false,
  paginationMode: _models.GridFeatureModeConstant.client,
  rowHeight: 52,
  rowsPerPageOptions: [25, 50, 100],
  rowSpacingType: 'margin',
  showCellRightBorder: false,
  showColumnRightBorder: false,
  sortingOrder: ['asc', 'desc', null],
  sortingMode: _models.GridFeatureModeConstant.client,
  throttleRowsMs: 0,
  disableColumnReorder: false,
  disableColumnResize: false
};
exports.DATA_GRID_PROPS_DEFAULT_VALUES = DATA_GRID_PROPS_DEFAULT_VALUES;

const useDataGridProps = inProps => {
  if (inProps.pageSize > MAX_PAGE_SIZE) {
    throw new Error(`'props.pageSize' cannot exceed 100 in DataGrid.`);
  }

  const themedProps = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiDataGrid'
  });
  const localeText = React.useMemo(() => (0, _extends2.default)({}, _constants.GRID_DEFAULT_LOCALE_TEXT, themedProps.localeText), [themedProps.localeText]);
  const components = React.useMemo(() => {
    const overrides = themedProps.components;

    if (!overrides) {
      return (0, _extends2.default)({}, _constants.DATA_GRID_DEFAULT_SLOTS_COMPONENTS);
    }

    const mergedComponents = {};
    Object.entries(_constants.DATA_GRID_DEFAULT_SLOTS_COMPONENTS).forEach(([key, defaultComponent]) => {
      mergedComponents[key] = overrides[key] === undefined ? defaultComponent : overrides[key];
    });
    return mergedComponents;
  }, [themedProps.components]);
  return React.useMemo(() => (0, _extends2.default)({}, DATA_GRID_PROPS_DEFAULT_VALUES, themedProps, {
    localeText,
    components
  }, DATA_GRID_FORCED_PROPS), [themedProps, localeText, components]);
};

exports.useDataGridProps = useDataGridProps;
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useThemeProps } from '@mui/material/styles';
import { DATA_GRID_DEFAULT_SLOTS_COMPONENTS, GRID_DEFAULT_LOCALE_TEXT } from '../constants';
import { GridDensityTypes, GridEditModes, GridFeatureModeConstant } from '../models';
var DATA_GRID_FORCED_PROPS = {
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
export var MAX_PAGE_SIZE = 100;
/**
 * The default values of `DataGridPropsWithDefaultValues` to inject in the props of DataGrid.
 */

export var DATA_GRID_PROPS_DEFAULT_VALUES = {
  autoHeight: false,
  autoPageSize: false,
  checkboxSelection: false,
  checkboxSelectionVisibleOnly: false,
  columnBuffer: 3,
  rowBuffer: 3,
  columnThreshold: 3,
  rowThreshold: 3,
  density: GridDensityTypes.Standard,
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
  editMode: GridEditModes.Cell,
  filterMode: GridFeatureModeConstant.client,
  headerHeight: 56,
  hideFooter: false,
  hideFooterPagination: false,
  hideFooterRowCount: false,
  hideFooterSelectedRowCount: false,
  logger: console,
  logLevel: process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  pagination: false,
  paginationMode: GridFeatureModeConstant.client,
  rowHeight: 52,
  rowsPerPageOptions: [25, 50, 100],
  rowSpacingType: 'margin',
  showCellRightBorder: false,
  showColumnRightBorder: false,
  sortingOrder: ['asc', 'desc', null],
  sortingMode: GridFeatureModeConstant.client,
  throttleRowsMs: 0,
  disableColumnReorder: false,
  disableColumnResize: false
};
export var useDataGridProps = function useDataGridProps(inProps) {
  if (inProps.pageSize > MAX_PAGE_SIZE) {
    throw new Error("'props.pageSize' cannot exceed 100 in DataGrid.");
  }

  var themedProps = useThemeProps({
    props: inProps,
    name: 'MuiDataGrid'
  });
  var localeText = React.useMemo(function () {
    return _extends({}, GRID_DEFAULT_LOCALE_TEXT, themedProps.localeText);
  }, [themedProps.localeText]);
  var components = React.useMemo(function () {
    var overrides = themedProps.components;

    if (!overrides) {
      return _extends({}, DATA_GRID_DEFAULT_SLOTS_COMPONENTS);
    }

    var mergedComponents = {};
    Object.entries(DATA_GRID_DEFAULT_SLOTS_COMPONENTS).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          defaultComponent = _ref2[1];

      mergedComponents[key] = overrides[key] === undefined ? defaultComponent : overrides[key];
    });
    return mergedComponents;
  }, [themedProps.components]);
  return React.useMemo(function () {
    return _extends({}, DATA_GRID_PROPS_DEFAULT_VALUES, themedProps, {
      localeText: localeText,
      components: components
    }, DATA_GRID_FORCED_PROPS);
  }, [themedProps, localeText, components]);
};
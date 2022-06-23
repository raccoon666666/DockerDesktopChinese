import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useThemeProps } from '@mui/material/styles';
import { DATA_GRID_DEFAULT_SLOTS_COMPONENTS, GRID_DEFAULT_LOCALE_TEXT, DATA_GRID_PROPS_DEFAULT_VALUES } from '@mui/x-data-grid';

/**
 * The default values of `DataGridProPropsWithDefaultValue` to inject in the props of DataGridPro.
 */
export const DATA_GRID_PRO_PROPS_DEFAULT_VALUES = _extends({}, DATA_GRID_PROPS_DEFAULT_VALUES, {
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
export const useDataGridProProps = inProps => {
  const themedProps = useThemeProps({
    props: inProps,
    name: 'MuiDataGrid'
  });
  const localeText = React.useMemo(() => _extends({}, GRID_DEFAULT_LOCALE_TEXT, themedProps.localeText), [themedProps.localeText]);
  const components = React.useMemo(() => {
    const overrides = themedProps.components;

    if (!overrides) {
      return _extends({}, DATA_GRID_DEFAULT_SLOTS_COMPONENTS);
    }

    const mergedComponents = {};
    Object.entries(DATA_GRID_DEFAULT_SLOTS_COMPONENTS).forEach(([key, defaultComponent]) => {
      mergedComponents[key] = overrides[key] === undefined ? defaultComponent : overrides[key];
    });
    return mergedComponents;
  }, [themedProps.components]);
  return React.useMemo(() => _extends({}, DATA_GRID_PRO_PROPS_DEFAULT_VALUES, themedProps, {
    disableRowGrouping: themedProps.disableRowGrouping || !themedProps.experimentalFeatures?.rowGrouping,
    localeText,
    components,
    signature: 'DataGridPro'
  }), [themedProps, localeText, components]);
};
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useThemeProps } from '@mui/material/styles';
import { DATA_GRID_DEFAULT_SLOTS_COMPONENTS, GRID_DEFAULT_LOCALE_TEXT, DATA_GRID_PROPS_DEFAULT_VALUES } from '@mui/x-data-grid';

/**
 * The default values of `DataGridProPropsWithDefaultValue` to inject in the props of DataGridPro.
 */
export var DATA_GRID_PRO_PROPS_DEFAULT_VALUES = _extends({}, DATA_GRID_PROPS_DEFAULT_VALUES, {
  scrollEndThreshold: 80,
  treeData: false,
  defaultGroupingExpansionDepth: 0,
  disableColumnPinning: false,
  disableRowGrouping: false,
  disableChildrenFiltering: false,
  disableChildrenSorting: false,
  rowGroupingColumnMode: 'single',
  getDetailPanelHeight: function getDetailPanelHeight() {
    return 500;
  }
});
export var useDataGridProProps = function useDataGridProProps(inProps) {
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
    var _themedProps$experime;

    return _extends({}, DATA_GRID_PRO_PROPS_DEFAULT_VALUES, themedProps, {
      disableRowGrouping: themedProps.disableRowGrouping || !((_themedProps$experime = themedProps.experimentalFeatures) != null && _themedProps$experime.rowGrouping),
      localeText: localeText,
      components: components,
      signature: 'DataGridPro'
    });
  }, [themedProps, localeText, components]);
};
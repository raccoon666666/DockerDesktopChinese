import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["componentsProps"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import Badge from '@mui/material/Badge';
import { capitalize } from '@mui/material/utils';
import { gridColumnLookupSelector } from '../../hooks/features/columns/gridColumnsSelector';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { gridFilterActiveItemsSelector } from '../../hooks/features/filter/gridFilterSelector';
import { gridPreferencePanelStateSelector } from '../../hooks/features/preferencesPanel/gridPreferencePanelSelector';
import { GridPreferencePanelsValue } from '../../hooks/features/preferencesPanel/gridPreferencePanelsValue';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['toolbarFilterList']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

var GridToolbarFilterListRoot = styled('ul', {
  name: 'MuiDataGrid',
  slot: 'ToolbarFilterList',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.toolbarFilterList;
  }
})(function (_ref) {
  var theme = _ref.theme;
  return {
    margin: theme.spacing(1, 1, 0.5),
    padding: theme.spacing(0, 1)
  };
});
var GridToolbarFilterButton = /*#__PURE__*/React.forwardRef(function GridToolbarFilterButton(props, ref) {
  var _rootProps$components, _rootProps$components2;

  var _props$componentsProp = props.componentsProps,
      componentsProps = _props$componentsProp === void 0 ? {} : _props$componentsProp,
      other = _objectWithoutProperties(props, _excluded);

  var buttonProps = componentsProps.button || {};
  var apiRef = useGridApiContext();
  var rootProps = useGridRootProps();
  var activeFilters = useGridSelector(apiRef, gridFilterActiveItemsSelector);
  var lookup = useGridSelector(apiRef, gridColumnLookupSelector);
  var preferencePanel = useGridSelector(apiRef, gridPreferencePanelStateSelector);
  var ownerState = {
    classes: rootProps.classes
  };
  var classes = useUtilityClasses(ownerState);
  var tooltipContentNode = React.useMemo(function () {
    if (preferencePanel.open) {
      return apiRef.current.getLocaleText('toolbarFiltersTooltipHide');
    }

    if (activeFilters.length === 0) {
      return apiRef.current.getLocaleText('toolbarFiltersTooltipShow');
    }

    var getOperatorLabel = function getOperatorLabel(item) {
      return lookup[item.columnField].filterOperators.find(function (operator) {
        return operator.value === item.operatorValue;
      }).label || apiRef.current.getLocaleText("filterOperator".concat(capitalize(item.operatorValue))).toString();
    };

    return /*#__PURE__*/_jsxs("div", {
      children: [apiRef.current.getLocaleText('toolbarFiltersTooltipActive')(activeFilters.length), /*#__PURE__*/_jsx(GridToolbarFilterListRoot, {
        className: classes.root,
        children: activeFilters.map(function (item, index) {
          return _extends({}, lookup[item.columnField] && /*#__PURE__*/_jsx("li", {
            children: "".concat(lookup[item.columnField].headerName || item.columnField, "\n                  ").concat(getOperatorLabel(item), "\n                  ").concat(item.value)
          }, index));
        })
      })]
    });
  }, [apiRef, preferencePanel.open, activeFilters, lookup, classes]);

  var toggleFilter = function toggleFilter(event) {
    var _buttonProps$onClick;

    var open = preferencePanel.open,
        openedPanelValue = preferencePanel.openedPanelValue;

    if (open && openedPanelValue === GridPreferencePanelsValue.filters) {
      apiRef.current.hideFilterPanel();
    } else {
      apiRef.current.showFilterPanel();
    }

    (_buttonProps$onClick = buttonProps.onClick) == null ? void 0 : _buttonProps$onClick.call(buttonProps, event);
  }; // Disable the button if the corresponding is disabled


  if (rootProps.disableColumnFilter) {
    return null;
  }

  return /*#__PURE__*/_jsx(rootProps.components.BaseTooltip, _extends({
    title: tooltipContentNode,
    enterDelay: 1000
  }, other, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.baseTooltip, {
    children: /*#__PURE__*/_jsx(rootProps.components.BaseButton, _extends({
      ref: ref,
      size: "small",
      color: "primary",
      "aria-label": apiRef.current.getLocaleText('toolbarFiltersLabel'),
      startIcon: /*#__PURE__*/_jsx(Badge, {
        badgeContent: activeFilters.length,
        color: "primary",
        children: /*#__PURE__*/_jsx(rootProps.components.OpenFilterButtonIcon, {})
      })
    }, buttonProps, {
      onClick: toggleFilter
    }, (_rootProps$components2 = rootProps.componentsProps) == null ? void 0 : _rootProps$components2.baseButton, {
      children: apiRef.current.getLocaleText('toolbarFilters')
    }))
  }));
});
process.env.NODE_ENV !== "production" ? GridToolbarFilterButton.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps: PropTypes.object
} : void 0;
export { GridToolbarFilterButton };
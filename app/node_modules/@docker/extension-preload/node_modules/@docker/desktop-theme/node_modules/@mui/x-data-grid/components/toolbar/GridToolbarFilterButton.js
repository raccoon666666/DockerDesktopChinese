import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["componentsProps"];
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

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['toolbarFilterList']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

const GridToolbarFilterListRoot = styled('ul', {
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
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const buttonProps = componentsProps.button || {};
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const activeFilters = useGridSelector(apiRef, gridFilterActiveItemsSelector);
  const lookup = useGridSelector(apiRef, gridColumnLookupSelector);
  const preferencePanel = useGridSelector(apiRef, gridPreferencePanelStateSelector);
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

    const getOperatorLabel = item => lookup[item.columnField].filterOperators.find(operator => operator.value === item.operatorValue).label || apiRef.current.getLocaleText(`filterOperator${capitalize(item.operatorValue)}`).toString();

    return /*#__PURE__*/_jsxs("div", {
      children: [apiRef.current.getLocaleText('toolbarFiltersTooltipActive')(activeFilters.length), /*#__PURE__*/_jsx(GridToolbarFilterListRoot, {
        className: classes.root,
        children: activeFilters.map((item, index) => _extends({}, lookup[item.columnField] && /*#__PURE__*/_jsx("li", {
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
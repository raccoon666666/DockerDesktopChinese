import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className"];
import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['panelHeader']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

var GridPanelHeaderRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'PanelHeader',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.panelHeader;
  }
})(function (_ref) {
  var theme = _ref.theme;
  return {
    padding: theme.spacing(1)
  };
});
export function GridPanelHeader(props) {
  var className = props.className,
      other = _objectWithoutProperties(props, _excluded);

  var rootProps = useGridRootProps();
  var ownerState = {
    classes: rootProps.classes
  };
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(GridPanelHeaderRoot, _extends({
    className: clsx(className, classes.root)
  }, other));
}
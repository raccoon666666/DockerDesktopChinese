import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className"];
import * as React from 'react';
import clsx from 'clsx';
import TrapFocus from '@mui/material/Unstable_TrapFocus';
import { styled } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['panelWrapper']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

var GridPanelWrapperRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'PanelWrapper',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.panelWrapper;
  }
})({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  '&:focus': {
    outline: 0
  }
});

var isEnabled = function isEnabled() {
  return true;
};

function GridPanelWrapper(props) {
  var className = props.className,
      other = _objectWithoutProperties(props, _excluded);

  var rootProps = useGridRootProps();
  var ownerState = {
    classes: rootProps.classes
  };
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(TrapFocus, {
    open: true,
    disableEnforceFocus: true,
    isEnabled: isEnabled,
    children: /*#__PURE__*/_jsx(GridPanelWrapperRoot, _extends({
      tabIndex: -1,
      className: clsx(className, classes.root)
    }, other))
  });
}

export { GridPanelWrapper };
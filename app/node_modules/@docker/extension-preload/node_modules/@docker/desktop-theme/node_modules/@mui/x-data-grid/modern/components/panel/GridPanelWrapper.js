import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["className"];
import * as React from 'react';
import clsx from 'clsx';
import TrapFocus from '@mui/material/Unstable_TrapFocus';
import { styled } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['panelWrapper']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

const GridPanelWrapperRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'PanelWrapper',
  overridesResolver: (props, styles) => styles.panelWrapper
})({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  '&:focus': {
    outline: 0
  }
});

const isEnabled = () => true;

function GridPanelWrapper(props) {
  const {
    className
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const rootProps = useGridRootProps();
  const ownerState = {
    classes: rootProps.classes
  };
  const classes = useUtilityClasses(ownerState);
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
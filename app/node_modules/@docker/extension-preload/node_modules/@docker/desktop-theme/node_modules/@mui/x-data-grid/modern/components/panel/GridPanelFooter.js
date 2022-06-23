import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["className"];
import * as React from 'react';
import clsx from 'clsx';
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
    root: ['panelFooter']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

const GridPanelFooterRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'PanelFooter',
  overridesResolver: (props, styles) => styles.panelFooter
})(({
  theme
}) => ({
  padding: theme.spacing(0.5),
  display: 'flex',
  justifyContent: 'space-between'
}));
export function GridPanelFooter(props) {
  const {
    className
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const rootProps = useGridRootProps();
  const ownerState = {
    classes: rootProps.classes
  };
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(GridPanelFooterRoot, _extends({
    className: clsx(className, classes.root)
  }, other));
}
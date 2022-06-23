import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["className", "children"];
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
    root: ['toolbarContainer']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

const GridToolbarContainerRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'ToolbarContainer',
  overridesResolver: (props, styles) => styles.toolbarContainer
})(({
  theme
}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.5, 0.5, 0)
}));
export const GridToolbarContainer = /*#__PURE__*/React.forwardRef(function GridToolbarContainer(props, ref) {
  const {
    className,
    children
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const rootProps = useGridRootProps();
  const ownerState = {
    classes: rootProps.classes
  };
  const classes = useUtilityClasses(ownerState);

  if (!children) {
    return null;
  }

  return /*#__PURE__*/_jsx(GridToolbarContainerRoot, _extends({
    ref: ref,
    className: clsx(className, classes.root)
  }, other, {
    children: children
  }));
});
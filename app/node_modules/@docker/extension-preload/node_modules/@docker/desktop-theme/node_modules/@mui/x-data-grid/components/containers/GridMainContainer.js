import * as React from 'react';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['main']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

const GridMainContainerRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'Main',
  overridesResolver: (props, styles) => styles.main
})(() => ({
  position: 'relative',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden'
}));
export function GridMainContainer(props) {
  const rootProps = useGridRootProps();
  const ownerState = {
    classes: rootProps.classes
  };
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(GridMainContainerRoot, {
    className: classes.root,
    children: props.children
  });
}
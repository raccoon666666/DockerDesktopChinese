import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["className"];
import * as React from 'react';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { styled, alpha, lighten, darken } from '@mui/material/styles';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['footerContainer']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

const GridFooterContainerRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'FooterContainer',
  overridesResolver: (props, styles) => styles.footerContainer
})(({
  theme
}) => {
  const borderColor = theme.palette.mode === 'light' ? lighten(alpha(theme.palette.divider, 1), 0.88) : darken(alpha(theme.palette.divider, 1), 0.68);
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 52,
    // Match TablePagination min height
    borderTop: `1px solid ${borderColor}`
  };
});
export const GridFooterContainer = /*#__PURE__*/React.forwardRef(function GridFooterContainer(props, ref) {
  const {
    className
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const rootProps = useGridRootProps();
  const ownerState = {
    classes: rootProps.classes
  };
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(GridFooterContainerRoot, _extends({
    ref: ref,
    className: clsx(classes.root, className)
  }, other));
});
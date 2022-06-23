import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className"];
import * as React from 'react';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { styled, alpha, lighten, darken } from '@mui/material/styles';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['footerContainer']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

var GridFooterContainerRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'FooterContainer',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.footerContainer;
  }
})(function (_ref) {
  var theme = _ref.theme;
  var borderColor = theme.palette.mode === 'light' ? lighten(alpha(theme.palette.divider, 1), 0.88) : darken(alpha(theme.palette.divider, 1), 0.68);
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 52,
    // Match TablePagination min height
    borderTop: "1px solid ".concat(borderColor)
  };
});
export var GridFooterContainer = /*#__PURE__*/React.forwardRef(function GridFooterContainer(props, ref) {
  var className = props.className,
      other = _objectWithoutProperties(props, _excluded);

  var rootProps = useGridRootProps();
  var ownerState = {
    classes: rootProps.classes
  };
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(GridFooterContainerRoot, _extends({
    ref: ref,
    className: clsx(classes.root, className)
  }, other));
});
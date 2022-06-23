import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className"];
import * as React from 'react';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['iconButtonContainer']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

var GridIconButtonContainerRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'IconButtonContainer',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.iconButtonContainer;
  }
})(function () {
  return {
    display: 'flex',
    visibility: 'hidden',
    width: 0
  };
});
export var GridIconButtonContainer = /*#__PURE__*/React.forwardRef(function GridIconButtonContainer(props, ref) {
  var className = props.className,
      other = _objectWithoutProperties(props, _excluded);

  var rootProps = useGridRootProps();
  var ownerState = {
    classes: rootProps.classes
  };
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(GridIconButtonContainerRoot, _extends({
    ref: ref,
    className: clsx(classes.root, className)
  }, other));
});
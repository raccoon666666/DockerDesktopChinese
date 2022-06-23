import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
var _excluded = ["className", "selectedRowCount"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { getDataGridUtilityClass } from '../constants/gridClasses';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['selectedRowCount']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

var GridSelectedRowCountRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'SelectedRowCount',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.selectedRowCount;
  }
})(function (_ref) {
  var theme = _ref.theme;
  return _defineProperty({
    alignItems: 'center',
    display: 'flex',
    margin: theme.spacing(0, 2),
    visibility: 'hidden',
    width: 0,
    height: 0
  }, theme.breakpoints.up('sm'), {
    visibility: 'visible',
    width: 'auto',
    height: 'auto'
  });
});
var GridSelectedRowCount = /*#__PURE__*/React.forwardRef(function GridSelectedRowCount(props, ref) {
  var className = props.className,
      selectedRowCount = props.selectedRowCount,
      other = _objectWithoutProperties(props, _excluded);

  var apiRef = useGridApiContext();
  var rootProps = useGridRootProps();
  var ownerState = {
    classes: rootProps.classes
  };
  var classes = useUtilityClasses(ownerState);
  var rowSelectedText = apiRef.current.getLocaleText('footerRowSelected')(selectedRowCount);
  return /*#__PURE__*/_jsx(GridSelectedRowCountRoot, _extends({
    ref: ref,
    className: clsx(classes.root, className)
  }, other, {
    children: rowSelectedText
  }));
});
process.env.NODE_ENV !== "production" ? GridSelectedRowCount.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  selectedRowCount: PropTypes.number.isRequired
} : void 0;
export { GridSelectedRowCount };
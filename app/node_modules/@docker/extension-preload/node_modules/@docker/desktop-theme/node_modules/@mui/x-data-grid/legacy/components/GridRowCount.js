import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "rowCount", "visibleRowCount"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { getDataGridUtilityClass } from '../constants/gridClasses';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['rowCount']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

var GridRowCountRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'RowCount',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.rowCount;
  }
})(function (_ref) {
  var theme = _ref.theme;
  return {
    alignItems: 'center',
    display: 'flex',
    margin: theme.spacing(0, 2)
  };
});
var GridRowCount = /*#__PURE__*/React.forwardRef(function GridRowCount(props, ref) {
  var className = props.className,
      rowCount = props.rowCount,
      visibleRowCount = props.visibleRowCount,
      other = _objectWithoutProperties(props, _excluded);

  var apiRef = useGridApiContext();
  var rootProps = useGridRootProps();
  var ownerState = {
    classes: rootProps.classes
  };
  var classes = useUtilityClasses(ownerState);

  if (rowCount === 0) {
    return null;
  }

  var text = visibleRowCount < rowCount ? apiRef.current.getLocaleText('footerTotalVisibleRows')(visibleRowCount, rowCount) : rowCount.toLocaleString();
  return /*#__PURE__*/_jsxs(GridRowCountRoot, _extends({
    ref: ref,
    className: clsx(classes.root, className)
  }, other, {
    children: [apiRef.current.getLocaleText('footerTotalRows'), " ", text]
  }));
});
process.env.NODE_ENV !== "production" ? GridRowCount.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  rowCount: PropTypes.number.isRequired,
  visibleRowCount: PropTypes.number.isRequired
} : void 0;
export { GridRowCount };
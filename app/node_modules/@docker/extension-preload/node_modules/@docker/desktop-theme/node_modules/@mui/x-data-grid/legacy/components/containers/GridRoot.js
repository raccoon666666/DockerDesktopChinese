import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["children", "className"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useForkRef } from '@mui/material/utils';
import NoSsr from '@mui/material/NoSsr';
import { GridRootStyles } from './GridRootStyles';
import { gridVisibleColumnDefinitionsSelector } from '../../hooks/features/columns/gridColumnsSelector';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { gridClasses } from '../../constants/gridClasses';
import { gridRowCountSelector } from '../../hooks/features/rows/gridRowsSelector';
import { jsx as _jsx } from "react/jsx-runtime";
var GridRoot = /*#__PURE__*/React.forwardRef(function GridRoot(props, ref) {
  var _rootProps$classes;

  var rootProps = useGridRootProps();

  var children = props.children,
      className = props.className,
      other = _objectWithoutProperties(props, _excluded);

  var apiRef = useGridApiContext();
  var visibleColumns = useGridSelector(apiRef, gridVisibleColumnDefinitionsSelector);
  var totalRowCount = useGridSelector(apiRef, gridRowCountSelector);
  var rootContainerRef = React.useRef(null);
  var handleRef = useForkRef(rootContainerRef, ref);
  apiRef.current.rootElementRef = rootContainerRef;
  return /*#__PURE__*/_jsx(NoSsr, {
    children: /*#__PURE__*/_jsx(GridRootStyles, _extends({
      ref: handleRef,
      className: clsx(className, (_rootProps$classes = rootProps.classes) == null ? void 0 : _rootProps$classes.root, gridClasses.root, rootProps.autoHeight && gridClasses.autoHeight),
      role: "grid",
      "aria-colcount": visibleColumns.length,
      "aria-rowcount": totalRowCount,
      "aria-multiselectable": !rootProps.disableMultipleSelection,
      "aria-label": rootProps['aria-label'],
      "aria-labelledby": rootProps['aria-labelledby']
    }, other, {
      children: children
    }))
  });
});
process.env.NODE_ENV !== "production" ? GridRoot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
export { GridRoot };
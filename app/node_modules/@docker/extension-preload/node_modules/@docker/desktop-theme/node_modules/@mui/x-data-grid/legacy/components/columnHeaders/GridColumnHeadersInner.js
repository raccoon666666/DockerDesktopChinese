import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
var _excluded = ["isDragging", "className"];
import * as React from 'react';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { gridClasses, getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var isDragging = ownerState.isDragging,
      hasScrollX = ownerState.hasScrollX,
      classes = ownerState.classes;
  var slots = {
    root: ['columnHeadersInner', isDragging && 'columnHeaderDropZone', hasScrollX && 'columnHeadersInner--scrollable']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

var GridColumnHeadersInnerRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'columnHeadersInner',
  overridesResolver: function overridesResolver(props, styles) {
    return [_defineProperty({}, "&.".concat(gridClasses.columnHeaderDropZone), styles.columnHeaderDropZone), styles.columnHeadersInner];
  }
})(function () {
  var _ref2;

  return _ref2 = {
    display: 'flex',
    alignItems: 'center'
  }, _defineProperty(_ref2, "&.".concat(gridClasses.columnHeaderDropZone, " .").concat(gridClasses.columnHeaderDraggableContainer), {
    cursor: 'move'
  }), _defineProperty(_ref2, "&.".concat(gridClasses['columnHeadersInner--scrollable'], " .").concat(gridClasses.columnHeader, ":last-child"), {
    borderRight: 'none'
  }), _ref2;
});
export var GridColumnHeadersInner = /*#__PURE__*/React.forwardRef(function GridColumnHeadersInner(props, ref) {
  var _apiRef$current$getRo, _apiRef$current$getRo2;

  var isDragging = props.isDragging,
      className = props.className,
      other = _objectWithoutProperties(props, _excluded);

  var apiRef = useGridApiContext();
  var rootProps = useGridRootProps();
  var ownerState = {
    isDragging: isDragging,
    hasScrollX: (_apiRef$current$getRo = (_apiRef$current$getRo2 = apiRef.current.getRootDimensions()) == null ? void 0 : _apiRef$current$getRo2.hasScrollX) != null ? _apiRef$current$getRo : false,
    classes: rootProps.classes
  };
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(GridColumnHeadersInnerRoot, _extends({
    ref: ref,
    className: clsx(className, classes.root)
  }, other));
});